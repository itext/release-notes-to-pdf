/*
    This file is part of the iText (R) project.
    Copyright (c) 1998-2026 Apryse Group NV
    Authors: Apryse Software.

    This program is offered under a commercial and under the AGPL license.
    For commercial licensing, contact us at https://itextpdf.com/sales.  For AGPL licensing, see below.

    AGPL licensing:
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
using System;
using System.Collections.Generic;
using iText.Kernel.Crypto;
using iText.Signatures;
using Net.Pkcs11Interop.Common;
using Net.Pkcs11Interop.HighLevelAPI;
using Net.Pkcs11Interop.HighLevelAPI.Factories;
using Net.Pkcs11Interop.HighLevelAPI.MechanismParams;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.X509;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// PKCS#11-backed implementation of <see cref="IExternalSignature"/> for iText signing.
    ///
    /// Responsibilities:
    /// <list type="bullet">
    /// <item><description>Enumerate slots/tokens</description></item>
    /// <item><description>Find private keys and matching X.509 certificates</description></item>
    /// <item><description>Perform signature operations via PKCS#11 mechanisms</description></item>
    /// </list>
    ///
    /// Notes:
    /// <list type="bullet">
    /// <item><description>This type maintains a cached PKCS#11 session and is not thread-safe.</description></item>
    /// <item><description>The PIN (if set) is copied into an internal buffer; the internal buffer is cleared on <see cref="Dispose"/> and on failed login/sign attempts.</description></item>
    /// </list>
    /// </summary>
     public class Pkcs11Signature : IExternalSignature, IDisposable
    {
        private IPkcs11Library pkcs11Library;
        private IObjectHandle privateKeyHandle;

        private X509Certificate[] chain;
        private string signatureAlgorithmName;
        private string digestAlgorithmName;
        private byte[] pin;

        private List<CKA> pkAttributeKeys;
        private List<CKA> certAttributeKeys;
        private ObjectAttributeFactory objectAttributeFactory;
        private SlotInfo selectedSlot;
        private ISession cachedSession;
        private bool loggedIn = false;

        /// <summary>
        /// Initializes a PKCS#11 signature provider by loading the specified PKCS#11 library.
        /// </summary>
        /// <param name="libraryPath">Path to the PKCS#11 native library (e.g., a vendor-provided DLL).</param>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="libraryPath"/> is <c>null</c>.</exception>
        /// <exception cref="Pkcs11Exception">Thrown when the library cannot be loaded or initialized.</exception>
        public Pkcs11Signature(string libraryPath)
        {
            pkAttributeKeys = new List<CKA>();
            pkAttributeKeys.Add(CKA.CKA_KEY_TYPE);
            pkAttributeKeys.Add(CKA.CKA_LABEL);
            pkAttributeKeys.Add(CKA.CKA_ID);

            certAttributeKeys = new List<CKA>();
            certAttributeKeys.Add(CKA.CKA_VALUE);
            certAttributeKeys.Add(CKA.CKA_LABEL);
            certAttributeKeys.Add(CKA.CKA_ID);
            certAttributeKeys.Add(CKA.CKA_CERTIFICATE_CATEGORY);

            objectAttributeFactory = new ObjectAttributeFactory();

            var factories = new Pkcs11InteropFactories();
            pkcs11Library = factories.Pkcs11LibraryFactory.LoadPkcs11Library(factories, libraryPath, AppType.MultiThreaded);
        }

        /// <summary>
        /// Enumerates slots exposed by the loaded PKCS#11 library.
        /// </summary>
        /// <remarks>
        /// The returned list includes slots with and without a token currently present.
        /// Each result item snapshots slot/token information at enumeration time.
        /// </remarks>
        /// <returns>A list of available slots.</returns>
        public List<Pkcs11Signature.SlotInfo> GetAvailableSlots()
        {
            var result = new List<Pkcs11Signature.SlotInfo>();
            foreach (var slot in pkcs11Library.GetSlotList(SlotsType.WithOrWithoutTokenPresent))
            {
                result.Add(new Pkcs11Signature.SlotInfo(slot));
            }
            return result;
        }
        /// <summary>
        /// Lists private keys and their linked X.509 certificates available in the specified slot.
        /// </summary>
        /// <remarks>
        /// A single private key (<c>CKO_PRIVATE_KEY</c>) can be linked to multiple certificates (<c>CKO_CERTIFICATE</c>)
        /// via the PKCS#11 <c>CKA_ID</c> attribute; this method returns one entry per key/certificate pairing.
        ///
        /// If the token requires login to enumerate objects, set <see cref="Pin"/> before calling.
        /// </remarks>
        /// <param name="slotId">Numeric slot identifier.</param>
        /// <returns>A list of key/certificate pairs found in the slot; empty if no token is present in the slot.</returns>
        /// <exception cref="Exception">Thrown when the slot cannot be found.</exception>
        public List<Pkcs11KeyInfo> GetCertificatesWithPrivateKeys(ulong slotId) {
            var slot = pkcs11Library.GetSlotList(SlotsType.WithOrWithoutTokenPresent).FindLast(s => s.SlotId == slotId);
            if (slot == null)
            {
                throw new ArgumentException("slot with slot id " + slotId + " was not found.");
            }
            return GetCertificatesWithPrivateKeys(new Pkcs11Signature.SlotInfo(slot));
        }


        /// <summary>
        /// Lists private keys and their linked X.509 certificates available in the specified slot.
        /// </summary>
        /// <remarks>
        /// A single private key (<c>CKO_PRIVATE_KEY</c>) can be linked to multiple certificates (<c>CKO_CERTIFICATE</c>)
        /// via the PKCS#11 <c>CKA_ID</c> attribute; this method returns one entry per key/certificate pairing.
        ///
        /// If the token requires login to enumerate objects, set <see cref="Pin"/> before calling.
        /// </remarks>
        /// <param name="slotInfo">Slot to query.</param>
        /// <returns>A list of key/certificate pairs found in the slot; empty if no token is present in the slot.</returns>
        public List<Pkcs11KeyInfo> GetCertificatesWithPrivateKeys(SlotInfo slotInfo)
        {
            var result = new List<Pkcs11KeyInfo>();
            if (slotInfo.TokenPresent)
            {
                var session = GetSession(slotInfo);
                {
                    List<IObjectAttribute> attributes = new List<IObjectAttribute>();
                    attributes.Add(objectAttributeFactory.Create(CKA.CKA_CLASS, CKO.CKO_PRIVATE_KEY));
                    List<IObjectHandle> keys = session.FindAllObjects(attributes);

                    foreach (var key in keys)
                    {
                        List<IObjectAttribute> keyAttributes = session.GetAttributeValue(key, pkAttributeKeys);

                        attributes.Clear();
                        attributes.Add(objectAttributeFactory.Create(CKA.CKA_CLASS, CKO.CKO_CERTIFICATE));
                        attributes.Add(objectAttributeFactory.Create(CKA.CKA_CERTIFICATE_TYPE, CKC.CKC_X_509));
                        attributes.Add(objectAttributeFactory.Create(CKA.CKA_ID, keyAttributes[2].GetValueAsByteArray()));
                        List<IObjectHandle> certificates = session.FindAllObjects(attributes);
                        foreach (var linkedCertificate in certificates)
                        {
                            List<IObjectAttribute> certificateAttributes = session.GetAttributeValue(linkedCertificate, certAttributeKeys);
                            result.Add(new Pkcs11KeyInfo(slotInfo, keyAttributes[2].GetValueAsByteArray(), keyAttributes[1]?.GetValueAsString(), certificateAttributes[0].GetValueAsByteArray(), certificateAttributes[1]?.GetValueAsString()));
                        }
                    }
                }
            }
            return result;
        }
        
        /// <summary>
        /// Selects the private key and certificate to be used for subsequent signing operations.
        /// </summary>
        /// <remarks>
        /// This method:
        /// <list type="bullet">
        /// <item><description>Resolves the PKCS#11 private key handle by <see cref="Pkcs11KeyInfo.KeyId"/>.</description></item>
        /// <item><description>Determines the key type and sets the corresponding signature algorithm name (RSA/DSA/ECDSA).</description></item>
        /// <item><description>Builds a certificate chain where the selected certificate is first, followed by other certificates present on the token.</description></item>
        /// </list>
        ///
        /// If the token requires login to access objects, set <see cref="Pin"/> before calling.
        /// </remarks>
        /// <param name="key">Key and certificate pair to use for signing.</param>
        /// <returns>This instance (fluent API).</returns>
        /// <exception cref="Exception">Thrown when the private key or certificate cannot be uniquely resolved on the token.</exception>
        public Pkcs11Signature SelectSigningKeyAndCertificate(Pkcs11KeyInfo key)
        {
            var session = GetSession(key.SlotInfo);
            var objectAttributeFactory = new ObjectAttributeFactory();

            List<IObjectAttribute> attributes = new List<IObjectAttribute>();
            attributes.Add(objectAttributeFactory.Create(CKA.CKA_CLASS, CKO.CKO_PRIVATE_KEY));
            attributes.Add(objectAttributeFactory.Create(CKA.CKA_ID, key.KeyId));
            List<IObjectHandle> keys = session.FindAllObjects(attributes);

            if (keys.Count != 1)
            {
                throw new Exception("Key " + System.Convert.ToBase64String(key.KeyId) + " not found in token " + key.SlotInfo.TokenModel + " " + key.SlotInfo.TokenLabel);
            }

            privateKeyHandle = keys[0];

            List<IObjectAttribute> keyAttributes = session.GetAttributeValue(privateKeyHandle, pkAttributeKeys);

            var type = keyAttributes[0].GetValueAsUlong();
            switch (type)
            {
                case (ulong)CKK.CKK_RSA:
                    signatureAlgorithmName = "RSA";
                    break;
                case (ulong)CKK.CKK_DSA:
                    signatureAlgorithmName = "DSA";
                    break;
                case (ulong)CKK.CKK_ECDSA:
                    signatureAlgorithmName = "ECDSA";
                    break;
            }

            attributes.Clear();
            attributes.Add(objectAttributeFactory.Create(CKA.CKA_CLASS, CKO.CKO_CERTIFICATE));
            attributes.Add(objectAttributeFactory.Create(CKA.CKA_CERTIFICATE_TYPE, CKC.CKC_X_509));
            attributes.Add(objectAttributeFactory.Create(CKA.CKA_VALUE, key.CertificateBytes));
            List<IObjectHandle> certificates = session.FindAllObjects(attributes);
            if (certificates.Count != 1)
            {
                ;
                throw new Exception("Certificate " + key.Certificate + "not found in token " + key.SlotInfo.TokenModel + " " + key.SlotInfo.TokenLabel);
            }

            var certificate = certificates[0];
            List<IObjectAttribute> certificateAttributes = session.GetAttributeValue(certificate, certAttributeKeys);
            var x509Certificate = new X509Certificate(X509CertificateStructure.GetInstance(certificateAttributes[0].GetValueAsByteArray()));

            List<X509Certificate> x509Certificates = new List<X509Certificate>();
            x509Certificates.Add(x509Certificate);
            attributes.Clear();
            attributes.Add(objectAttributeFactory.Create(CKA.CKA_CLASS, CKO.CKO_CERTIFICATE));
            attributes.Add(objectAttributeFactory.Create(CKA.CKA_CERTIFICATE_TYPE, CKC.CKC_X_509));
            List<IObjectHandle> otherCertificates = session.FindAllObjects(attributes);
            foreach (var otherCertificate in otherCertificates)
            {
                if (!certificate.ObjectId.Equals(otherCertificate.ObjectId))
                {
                    certificateAttributes = session.GetAttributeValue(otherCertificate, certAttributeKeys);
                    var otherX509Certificate = new X509Certificate(X509CertificateStructure.GetInstance(certificateAttributes[0].GetValueAsByteArray()));
                    x509Certificates.Add(otherX509Certificate);
                }
            }
            this.chain = x509Certificates.ToArray();
            return this;
        }

        /// <summary>
        /// Releases PKCS#11 resources held by this instance.
        /// </summary>
        /// <remarks>
        /// This method attempts to:
        /// <list type="bullet">
        /// <item><description>Clear any stored PIN buffer.</description></item>
        /// <item><description>Close all sessions on the selected slot (if any).</description></item>
        /// <item><description>Dispose the loaded PKCS#11 library.</description></item>
        /// </list>
        /// </remarks>
        public void Dispose()
        {
            if (pin != null)
            {
                Array.Clear(pin, 0, pin.Length);
            }
            selectedSlot?.Slot.CloseAllSessions();
            pkcs11Library?.Dispose();
        }

        /// <summary>
        /// Gets the certificate chain currently associated with the selected signing key.
        /// </summary>
        /// <remarks>
        /// The chain is populated by <see cref="SelectSigningKeyAndCertificate"/>. The first certificate is the selected
        /// signing certificate; the remaining certificates are other X.509 certificates found on the token.
        /// </remarks>
        /// <returns>The certificate chain.</returns>
        /// <exception cref="Exception">Thrown when no signing key has been selected yet.</exception>
        public X509Certificate[] GetChain()
        {
            CheckKeySelected();
            return chain;
        }

        /// <summary>
        /// When <c>true</c> and the selected key is RSA, uses RSA-PSS (RSASSA-PSS) instead of RSA PKCS#1 v1.5.
        /// </summary>
        /// <remarks>
        /// This affects <see cref="GetSignatureAlgorithmName"/> and <see cref="GetSignatureMechanismParameters"/>,
        /// and switches the PKCS#11 signing mechanism used in <see cref="Sign"/>.
        /// </remarks>
        public bool UsePssForRsaSsa { get; set; }

        /// <summary>
        /// Gets or sets the user PIN for token login.
        /// </summary>
        /// <remarks>
        /// A copy of the provided byte array is stored internally. For security, clear the original buffer as soon as possible.
        ///
        /// Some tokens require login to enumerate keys/certificates, while others require it only for signing.
        /// On login/sign failures, this implementation clears the stored PIN to reduce the risk of repeated failed attempts
        /// (which could lock the token).
        /// </remarks>
        public byte[] Pin
        {
            get => pin;
            set
            {
                if (pin != null)
                {
                    Array.Clear(pin, 0, pin.Length);
                }
                if (value != null)
                {
                    pin = new byte[value.Length];
                    Array.Copy(value, pin, pin.Length);
                }
                else
                {
                    pin = null;
                }
            }
        }

        /// <summary>
        /// Gets the signature algorithm name expected by iText.
        /// </summary>
        /// <remarks>
        /// For RSA keys, this returns either <c>"RSA"</c> or <c>"RSASSA-PSS"</c> depending on <see cref="UsePssForRsaSsa"/>.
        /// For non-RSA keys, it returns the selected key type (e.g. <c>"DSA"</c>, <c>"ECDSA"</c>).
        /// </remarks>
        /// <returns>The signature algorithm name.</returns>
        /// <exception cref="Exception">Thrown when no signing key has been selected yet.</exception>
        public string GetSignatureAlgorithmName()
        {
            CheckKeySelected();
            return UsePssForRsaSsa && "RSA".Equals(signatureAlgorithmName) ? "RSASSA-PSS" : signatureAlgorithmName;
        }

        /// <summary>
        /// Gets algorithm-specific parameters used by iText for the signature operation.
        /// </summary>
        /// <remarks>
        /// For RSA-PSS this returns PSS parameters derived from <see cref="digestAlgorithmName"/>.
        /// For other algorithms, it returns <c>null</c>.
        /// </remarks>
        /// <returns>Mechanism parameters for iText, or <c>null</c> if not applicable.</returns>
        /// <exception cref="Exception">Thrown when no signing key has been selected yet.</exception>
        public ISignatureMechanismParams GetSignatureMechanismParameters()
        {
            CheckKeySelected();
            return UsePssForRsaSsa && "RSA".Equals(signatureAlgorithmName) ? RSASSAPSSMechanismParams.CreateForDigestAlgorithm(digestAlgorithmName) : null;
        }

        /// <summary>
        /// Gets the digest algorithm name (e.g. <c>"SHA256"</c>) used to select the PKCS#11 signing mechanism.
        /// </summary>
        /// <returns>The digest algorithm name, or <c>null</c> if not configured yet.</returns>
        public string GetDigestAlgorithmName()
        {
            return digestAlgorithmName;
        }

        /// <summary>
        /// Sets the digest algorithm name (e.g. <c>"SHA256"</c>).
        /// </summary>
        /// <remarks>
        /// The provided value is normalized using iText <see cref="DigestAlgorithms"/> utilities so that the internal value
        /// matches iText naming conventions.
        /// </remarks>
        /// <param name="digestAlgorithmName">Digest algorithm name.</param>
        /// <returns>This instance (fluent API).</returns>
        /// <exception cref="ArgumentException">Thrown when the digest algorithm is not supported/allowed by iText.</exception>
        public Pkcs11Signature SetDigestAlgorithmName(String digestAlgorithmName)
        {
            this.digestAlgorithmName = DigestAlgorithms.GetDigest(DigestAlgorithms.GetAllowedDigest(digestAlgorithmName));
            return this;
        }

        /// <summary>
        /// Signs the provided data using the selected key and configured digest/signature settings.
        /// </summary>
        /// <remarks>
        /// The PKCS#11 mechanism is chosen based on:
        /// <list type="bullet">
        /// <item><description>The selected key type (RSA/DSA/ECDSA)</description></item>
        /// <item><description>The configured digest algorithm (<see cref="SetDigestAlgorithmName"/>)</description></item>
        /// <item><description><see cref="UsePssForRsaSsa"/> for RSA keys</description></item>
        /// </list>
        ///
        /// On failure, this method clears the stored PIN (if any) and closes sessions on the selected slot.
        /// </remarks>
        /// <param name="message">Data to be signed as provided by iText.</param>
        /// <returns>The signature bytes returned by the token.</returns>
        /// <exception cref="Exception">Thrown when no signing key has been selected yet.</exception>
        /// <exception cref="ArgumentException">Thrown when the key/digest combination is not supported.</exception>
        public byte[] Sign(byte[] message)
        {
            CheckKeySelected();
            var mechanismFactory = new MechanismFactory();
            IMechanism mechanism;

            switch (signatureAlgorithmName)
            {
                case "DSA":
                    switch (digestAlgorithmName)
                    {
                        case "SHA1":
                            mechanism = mechanismFactory.Create(CKM.CKM_DSA_SHA1);
                            break;
                        case "SHA224":
                            mechanism = mechanismFactory.Create(CKM.CKM_DSA_SHA224);
                            break;
                        case "SHA256":
                            mechanism = mechanismFactory.Create(CKM.CKM_DSA_SHA256);
                            break;
                        case "SHA384":
                            mechanism = mechanismFactory.Create(CKM.CKM_DSA_SHA384);
                            break;
                        case "SHA512":
                            mechanism = mechanismFactory.Create(CKM.CKM_DSA_SHA512);
                            break;
                        default:
                            throw new ArgumentException("Not supported: " + digestAlgorithmName + "with" + signatureAlgorithmName);
                    }
                    break;
                case "ECDSA":
                    switch (digestAlgorithmName)
                    {
                        case "SHA1":
                            mechanism = mechanismFactory.Create(CKM.CKM_ECDSA_SHA1);
                            break;
                        case "SHA224":
                            mechanism = mechanismFactory.Create(CKM.CKM_ECDSA_SHA224);
                            break;
                        case "SHA256":
                            mechanism = mechanismFactory.Create(CKM.CKM_ECDSA_SHA256);
                            break;
                        case "SHA384":
                            mechanism = mechanismFactory.Create(CKM.CKM_ECDSA_SHA384);
                            break;
                        case "SHA512":
                            mechanism = mechanismFactory.Create(CKM.CKM_ECDSA_SHA512);
                            break;
                        default:
                            throw new ArgumentException("Not supported: " + digestAlgorithmName + "with" + signatureAlgorithmName);
                    }
                    break;
                case "RSA":
                    if (UsePssForRsaSsa)
                    {
                        var mechanismParamsFactory = new MechanismParamsFactory();
                        IMechanismParams pssParams = null;
                        switch (digestAlgorithmName)
                        {
                            case "SHA1":
                                pssParams = mechanismParamsFactory.CreateCkRsaPkcsPssParams((ulong)CKM.CKM_SHA_1, (ulong)CKG.CKG_MGF1_SHA1, (ulong)(DigestAlgorithms.GetOutputBitLength(digestAlgorithmName) / 8));
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA1_RSA_PKCS_PSS, pssParams);
                                break;
                            case "SHA224":
                                pssParams = mechanismParamsFactory.CreateCkRsaPkcsPssParams((ulong)CKM.CKM_SHA224, (ulong)CKG.CKG_MGF1_SHA224, (ulong)(DigestAlgorithms.GetOutputBitLength(digestAlgorithmName) / 8));
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA224_RSA_PKCS_PSS, pssParams);
                                break;
                            case "SHA256":
                                pssParams = mechanismParamsFactory.CreateCkRsaPkcsPssParams((ulong)CKM.CKM_SHA256, (ulong)CKG.CKG_MGF1_SHA256, (ulong)(DigestAlgorithms.GetOutputBitLength(digestAlgorithmName) / 8));
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA256_RSA_PKCS_PSS, pssParams);
                                break;
                            case "SHA384":
                                pssParams = mechanismParamsFactory.CreateCkRsaPkcsPssParams((ulong)CKM.CKM_SHA384, (ulong)CKG.CKG_MGF1_SHA384, (ulong)(DigestAlgorithms.GetOutputBitLength(digestAlgorithmName) / 8));
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA384_RSA_PKCS_PSS, pssParams);
                                break;
                            case "SHA512":
                                pssParams = mechanismParamsFactory.CreateCkRsaPkcsPssParams((ulong)CKM.CKM_SHA224, (ulong)CKG.CKG_MGF1_SHA224, (ulong)(DigestAlgorithms.GetOutputBitLength(digestAlgorithmName) / 8));
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA512_RSA_PKCS_PSS, pssParams);
                                break;
                            default:
                                throw new ArgumentException("Not supported: " + digestAlgorithmName + "with" + signatureAlgorithmName);
                        }
                    }
                    else
                    {
                        switch (digestAlgorithmName)
                        {
                            case "SHA1":
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA1_RSA_PKCS);
                                break;
                            case "SHA224":
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA224_RSA_PKCS);
                                break;
                            case "SHA256":
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA256_RSA_PKCS);
                                break;
                            case "SHA384":
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA384_RSA_PKCS);
                                break;
                            case "SHA512":
                                mechanism = mechanismFactory.Create(CKM.CKM_SHA512_RSA_PKCS);
                                break;
                            default:
                                throw new ArgumentException("Not supported: " + digestAlgorithmName + "with" + signatureAlgorithmName);
                        }
                    }
                    break;
                default:
                    throw new ArgumentException("Not supported: " + digestAlgorithmName + "with" + signatureAlgorithmName);
            }
            var session = GetSession(selectedSlot);
            try
            {
                return session.Sign(mechanism, privateKeyHandle, message);
            }
            catch (Exception e)
            {
                if (pin != null)
                {
                    Array.Clear(pin, 0, pin.Length);
                    pin = null;
                }
                selectedSlot?.Slot.CloseAllSessions();
                throw;
            }
        }

        /// <summary>
        /// Gets (and caches) a PKCS#11 session for the given slot, logging in if a PIN is available.
        /// </summary>
        /// <remarks>
        /// If a cached session exists for a different slot, it is closed and all sessions on that slot are closed as well.
        /// </remarks>
        /// <param name="slotInfo">Slot to open/use.</param>
        /// <returns>An open session associated with <paramref name="slotInfo"/>.</returns>
        private ISession GetSession(SlotInfo slotInfo)
        {
            if (slotInfo == selectedSlot && cachedSession != null)
            {
                LogIn();
                return cachedSession;
            }
            if (cachedSession != null)
            {
                cachedSession.CloseSession();
                slotInfo.Slot.CloseAllSessions();
            }
            cachedSession = slotInfo.GetSession();
            selectedSlot = slotInfo;
            LogIn();
            return cachedSession;
        }

        /// <summary>
        /// Logs in to the token as a user (CKU_USER) if a PIN has been configured and no login has been performed yet.
        /// </summary>
        /// <remarks>
        /// If login fails, the stored PIN is cleared to reduce the risk of repeated failed attempts.
        /// </remarks>
        private void LogIn()
        {
            if (pin != null && !loggedIn)
            {
                try
                {
                    cachedSession.Login(CKU.CKU_USER, pin);
                }
                catch (Exception e)
                {
                    Array.Clear(pin, 0, pin.Length);
                    pin = null;
                    throw;
                }
                loggedIn = true;
            }
        }
        
        /// <summary>
        /// Ensures that a private key has been selected for signing.
        /// </summary>
        /// <exception cref="Exception">Thrown when no signing key has been selected yet.</exception>
        private void CheckKeySelected()
        {
            if (privateKeyHandle == null)
                throw new ArgumentException("Invalid state, no key selected yet.");            
        }

        /// <summary>
        /// Represents detailed information about a PKCS#11 slot and its associated properties.
        /// Responsibilities:
        /// <list type="bullet">
        /// <item><description>Encapsulates metadata related to a PKCS#11 slot, including slot ID, description, and hardware capabilities.</description></item>
        /// <item><description>Determines whether a token is present in the slot and provides access to token-specific properties.</description></item>
        /// <item><description>Enables the creation of a new read-only session for interacting with the slot's token.</description></item>
        /// </list>
        /// Notes:
        /// <list type="bullet">
        /// <item><description>The slot instance provides only read-only access for safety and thread-safety considerations.</description></item>
        /// <item><description>Token-specific properties such as label, model, and login requirements are available only if a token is present in the slot.</description></item>
        /// </list>
        /// </summary>
        public class SlotInfo
        {
            private ISlotInfo slotInfo;
            private ISlot slot;
            private ITokenInfo tokenInfo;

            /// <summary>
            /// Opens a new read-only PKCS#11 session for this slot.
            /// </summary>
            /// <returns>An open, read-only <see cref="ISession"/>.</returns>
            internal SlotInfo(ISlot slot)
            {
                this.slot = slot;
                this.slotInfo = slot.GetSlotInfo();
                if (slotInfo.SlotFlags.TokenPresent)
                {
                    this.tokenInfo = slot.GetTokenInfo();
                }
            }
            
            public ulong SlotId { get => slotInfo.SlotId; }
            public string SlotDescription { get => slotInfo.SlotDescription; }
            public bool HardwareSlot { get => slotInfo.SlotFlags.HardwareSlot; }
            public bool RemovableDevice { get => slotInfo.SlotFlags.RemovableDevice; }
            public bool TokenPresent { get => slotInfo.SlotFlags.TokenPresent; }
            public string TokenModel { get => tokenInfo?.Model; }
            public string TokenLabel { get => tokenInfo?.Label; }
            public bool LoginRequired { get => tokenInfo?.TokenFlags.LoginRequired ?? false; }

            internal ISlot Slot { get => slot; }
            internal ISlotInfo GetSlotInfo() { return slotInfo; }
            internal ITokenInfo GetTokenInfo() { return tokenInfo; }

            internal ISession GetSession()
            {
                return slot.OpenSession(SessionType.ReadOnly);
            }
        }

        /// <summary>
        /// Contains info about keys available trough pkcs 11 container    
        /// </summary>
        public class Pkcs11KeyInfo
        {
            /// <summary>
            /// The key id
            /// </summary>
            public byte[] KeyId { get; }
            /// <summary>
            /// The label of the key
            /// </summary>
            public string KeyLabel { get; }            

            /// <summary>
            /// The certificate associated with the key
            /// </summary>
            public X509Certificate Certificate { get; }

            /// <summary>
            /// The label assigned to the certificate
            /// </summary>
            public string CertificateLabel { get; }
            public SlotInfo SlotInfo { get; internal set; }

            internal byte[] CertificateBytes;
            
            /// <summary>
            /// Creates a key/certificate association discovered on a token.
            /// </summary>
            /// <param name="slotInfo">Slot containing the token.</param>
            /// <param name="keyId">Key identifier (PKCS#11 CKA_ID).</param>
            /// <param name="keyLabel">Key label (PKCS#11 CKA_LABEL), if present.</param>
            /// <param name="certificate">DER-encoded certificate bytes (PKCS#11 CKA_VALUE).</param>
            /// <param name="certificateLabel">Certificate label (PKCS#11 CKA_LABEL), if present.</param>
            internal Pkcs11KeyInfo(SlotInfo slotInfo, byte[] keyId, string keyLabel, byte[] certificate, string certificateLabel)
            {
                this.SlotInfo = slotInfo;
                this.KeyId = keyId;
                this.KeyLabel = keyLabel;
                this.CertificateBytes = certificate;
                this.Certificate = new X509Certificate(X509CertificateStructure.GetInstance(certificate));
                this.CertificateLabel = certificateLabel;
            }
        }
    }
}