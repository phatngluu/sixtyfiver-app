export const environment = {

  /* * * * * * *
    Warehouse
  * * * * * * */
  allFilesUrl: 'api/warehouse/all',
  deleteFileUrl: 'api/warehouse/',
  downloadFileUrl: 'api/warehouse/download?id=',

  /* * * * * * *
    Pethernet
  * * * * * * */

  // Contract
  getContractAddress: 'api/contractAddress',
  getContractABI: 'api/contractABI',

  // Vaccine doses
  addVaccineDose: 'api/vaccinedose/add',

  // Medical units
  addMedicalUnit: 'api/medicalunit/add',
  getVerifiedMedicalUnits: 'api/medicalunit/getVerified',
  getUnverifiedMedicalUnits: 'api/medicalunit/getUnverified',
  verifyMedicalUnit: 'api/medicalunit/verify',
  issueCertificate: 'api/medicalunit/issueCertificate',

  // Doctor
  addDoctor: 'api/doctor/add',
  checkDoctor: 'api/doctor/check',

  // Injector
  addInjector: 'api/injector/add',
  checkInjector: 'api/injector/check',
};
