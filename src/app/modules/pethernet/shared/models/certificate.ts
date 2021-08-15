export interface Certificate {
  medicalUnitHash: string,
  injectorHash: string,
  doctorHash: string,
  vaccineDoseHash: string,
  hash: string,
  injectorCitizenId?: string
}
