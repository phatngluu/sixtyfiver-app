export interface MedicalUnit {
  medCode: string,
  address: string,
  contact: string,
  hash: string,
  registeredOn: Date,
  verifiedOn?: Date,
  verificationStatus?: string,
}
