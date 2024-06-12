
export interface createuser {
    authid:string,
    profile?: string;
    fullname: string;
    email:string,
    contactphone?: number;
    gender?: string;
    location?: string;
    DOB?: Date;
    nationality?: string;
    address?: string;
    educationbackground?: string;
}

export interface updateuser{
    profile?: string;
    fullname?: string;
    email?: string;
    contactphone?: number;
    gender?: string;
    location?: string;
    DOB?: Date;
    nationality?: string;
    address?: string;
    educationbackground?: string;
}