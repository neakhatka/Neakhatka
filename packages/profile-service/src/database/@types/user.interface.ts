
export interface IUserDocument {
    _id?: string ,
    authid:string,
    profile?: string;
    fullname: string;
    email: string;
    contactphone?:number;
    gender?: string;
    location?: string;
    DOB: Date;
    nationality?: string;
    address?: string;
    educationbackground?: string;
    favorite?: string[],
    createdAt?: Date;
}
