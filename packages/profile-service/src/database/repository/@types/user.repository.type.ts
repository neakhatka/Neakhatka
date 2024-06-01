
export interface createuser {
    authid:string,
    profilePicture?: string;
    FullName: string;
    email:string,
    contactPhone?: number;
    gender?: string;
    location?: string;
    dateOfBirth?: Date;
    nationality?: string;
    address?: string;
    educationBackground?: string;
}

export interface updateuser{
    profilePicture?: string;
    FullName?: string;
    email?: string;
    contactPhone?: number;
    gender?: string;
    location?: string;
    dateOfBirth?: Date;
    nationality?: string;
    address?: string;
    educationBackground?: string;
}