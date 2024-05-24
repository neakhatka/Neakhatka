
export interface createuser {
    FullName: string;
    email:string,
}


export interface updateuser{
    profilePicture?: string;
    FullName?: string;
    email?: string;
    contactPhone?: string;
    gender?: string;
    location?: string;
    dateOfBirth?: Date;
    nationality?: string;
    address?: string;
    educationBackground?: string;
}