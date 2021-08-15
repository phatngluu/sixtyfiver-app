export interface MedicalUnit {
  medCode: string,
  medName: string,
  accountAddress: string,
  physicalAddress: string,
  hash: string,
  registeredOn: Date,
  verifiedOn?: Date,
  verificationStatus?: string,
}
