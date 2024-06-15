export interface IUserDocument {
  _id?: string;
  authid?: string;
  profile?: string;
  fullname: string;
  email: string;
  contactphone?: string;
  gender?: string;
  location?: string;
  DOB: string;
  nationality?: string;
  address?: string;
  educationbackground?: string;
  favorite?: string[];
  createdAt?: Date;
}
