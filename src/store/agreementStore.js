import { create } from 'zustand';

const agreementStore = (set) => ({
  selectAllCheck: false,
  serviceAgreementCheck: false,
  privacyPolicyCheck: false,
  ageVerificationCheck: false,
  marketingAgreementCheck: false,
  setSelectAllCheck: (selectAllCheck) => set({ selectAllCheck }),
  setServiceAgreementCheck: (serviceAgreementCheck) =>
    set({ serviceAgreementCheck }),
  setPrivacyPolicyCheck: (privacyPolicyCheck) => set({ privacyPolicyCheck }),
  setAgeVerificationCheck: (ageVerificationCheck) =>
    set({ ageVerificationCheck }),
  setMarketingAgreementCheck: (marketingAgreementCheck) =>
    set({ marketingAgreementCheck }),
});

const useAgreement = create(agreementStore);

export default useAgreement;
