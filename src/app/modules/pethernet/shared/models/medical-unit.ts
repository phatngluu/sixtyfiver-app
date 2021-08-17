export interface MedicalUnit {
  userId: number,
  medCode: string,
  medName: string,
  accountAddress: string,
  physicalAddress: string,
  hash: string,
  registeredOn: Date,
  verifiedOn?: Date,
  verificationStatus?: string,
}
