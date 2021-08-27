export const environment = {

  /* * * * * * *
    Auth
  * * * * * * */
  authenticate: '/authenticate',

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
  getAllVaccineDoses: 'api/vaccinedose/getAll',
  distributeVaccineDose: 'api/vaccinedose/distribute',

  // Medical units
  addMedicalUnit: 'api/medicalunit/add',
  getMedicalUnitDetails: 'api/medicalunit/get',
  getAuthorizedMedicalUnit: 'api/medicalunit/getAuthorizedMedicalUnit',
  getVerifiedMedicalUnits: 'api/medicalunit/getVerified',
  getUnverifiedMedicalUnits: 'api/medicalunit/getUnverified',
  verifyMedicalUnit: 'api/medicalunit/verify',
  issueCertificate: 'api/medicalunit/issueCertificate',
  // getIssuedCertificates: 'api/medicalunit/getIssuedCertificates',
  getAvailableVaccineDoses: '/api/medicalunit/getAvailableVaccineDoses',

  // Doctor
  addDoctor: 'api/doctor/add',
  checkDoctor: 'api/doctor/check',

  // Injector
  addInjector: 'api/injector/add',
  getAuthorizedInjector: 'api/injector/getAuthorizedInjector',
  getAuthorizedCertificate: 'api/injector/getAuthorizedCert',
  checkInjector: 'api/injector/check',
};
