export interface AuthCredential {
  sub: number,
  role: Role
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
  MinistryOfHealth = 'MinistryOfHealth',
  MedicalUnit = 'MedicalUnit',
  Doctor = 'Doctor',
  Injector = 'Injector',
}
