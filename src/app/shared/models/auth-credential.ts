export interface AuthCredential {
  sub: number,
  firstName: string,
  role: Role,
  token: string,
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
  MinistryOfHealth = 'MinistryOfHealth',
  MedicalUnit = 'MedicalUnit',
  Doctor = 'Doctor',
  Injector = 'Injector',
}
