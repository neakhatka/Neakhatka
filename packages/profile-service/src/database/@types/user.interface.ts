
export interface IUserDocument {
    _id?: string ,
    authid:string,
    profilePicture?: string;
    FullName: string;
    email: string;
    contactPhone?:number;
    gender?: string;
    location?: string;
    dateOfBirth: Date;
    nationality?: string;
    address?: string;
    educationBackground?: string;
    favoriteCards?: string[],
    createdAt?: Date;
}
