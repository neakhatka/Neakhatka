export interface ICompanyDocument {
  companyname?: string;
  logo?: string;
  contactphone?: number;
  websiteLink?: string;
  location?: string;
  contactemail?: string | undefined;
  contactperson: string;
  numberOfemployees: number;
  address: string;
  companydescription: string;
  userId?: string;
}
