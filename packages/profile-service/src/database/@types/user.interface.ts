
export interface IUserDocument {
    _id?: string ,
    profilePicture?: string;
    FullName: string;
    email: string;
    contactPhone?: string;
    gender?: string;
    location?: string;
    dateOfBirth: Date;
    nationality?: string;
    address?: string;
    educationBackground?: string;
    favoriteCards?: string[],
    createdAt?: Date;
}
