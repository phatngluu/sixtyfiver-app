const baseUrl = 'http://localhost:3000/';

export const environment = {
  // Base url

  // Warehouse
  allFilesUrl: baseUrl + 'api/warehouse/all',
  deleteFileUrl: baseUrl + 'api/warehouse/',
  downloadFileUrl: baseUrl + 'api/warehouse/download?id=',

  // Colleague Approval Endpoints
  getColleagueApprovalUnlinkBankAccount: 'api/action/colleagueApproval/unlinkSourceAccount',
  getColleagueApprovalLinkBankAccount: 'api/action/colleagueApproval/linkSourceAccount',
  getColleagueApprovalNewCurrentAccount: 'api/action/colleagueApproval/newCurrentAccount',
  getMinistryApprovalNewCurrentAccount: 'api/action/ministryApproval/newCurrentAccount',
  getMinistryApprovalModifyOverdraftLimit: 'api/action/ministryApproval/modifyOverdraftLimit',
  getColleagueApprovalEndCurrentAccountAction: 'api/action/colleagueApproval/endCurrentAccount',
  getColleagueApprovalNewDeposit: 'api/action/colleagueApproval/newDeposit',
  getColleagueApprovalModifyOverdraftLimit: 'api/action/colleagueApproval/modifyOverdraftLimit',
  getColleagueApprovalNewLoan: 'api/action/colleagueApproval/newLoan',
  editColleagueApprovalNewDeposit: 'api/action/colleagueApproval/edit/newDeposit',
  editColleagueApprovalNewLoan: 'api/action/colleagueApproval/edit/newLoan',
  updateColleagueApproval: 'api/action/colleagueApproval',
  updateMinistryApproval: 'api/action/ministryApproval',
  getEndOfDayBalanceEndCurrentAccount:'api/treasuryAccount/{accountNumber}/endOfDayBalance',
  getNumberLinkBankAccountEndCurrentAccount:'api/treasuryProduct/getNumberLinkBankAccount',

  // Additional Information endpoints
  getWaitAdditionalInformationDetails: 'api/action/additionalInformation/getWaitAdditionalInformationDetails',
  provideAdditionalInformation: 'api/action/additionalInformation/provideAdditionalInformation',

  // Product API
  currentAccountInfo: '/api/treasuryProduct/currentAccount',
  allCurrentAccountInfo: '/api/treasuryProduct/currentAccount/all',

  // Account API
  accountStatements: '/api/treasuryAccount/{accountNumber}/treasuryStatements',
  accountMutations: '/api/treasuryAccount/{accountNumber}/treasuryCurrentAccountMutations',
  treasuryProductMutations: '/api/treasuryAccount/{accountNumber}/treasuryProductMutations',

  // Participant Portal
  participantInformation: '/api/login/participantInformation',

  // Production
  production: false,

  // Login
  login: '/api/login',
  logout: '/api/login/logout',
  verifyEmail: '/api/login/verifyEmail',
  verifyCode: 'api/login/verifyCode',
  sendEmail: 'api/login/sendEmail',
  addEmailToUser: 'api/login/addEmailToUser',

  //Users
  allOrganizationUsers: '/api/user/getOrganizationUsers',
  updateUserRoles: '/api/user/updateUserRoles',
  getRoles: 'api/user/getRoles',
  getUser: 'api/user/getUser/{pseudoId}',
  deleteUser: 'api/user/deleteUser/{pseudoId}'
};
