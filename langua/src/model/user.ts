export interface User
{    
    id:string;
    password:string;
    firstname:string;
    surname:string;
    sex:string;
    birthday:string;
    country:string;
    city:string;
    nativeLanguage:string;
    userCredentials:UserCredentials;
    userContacts:UserContacts;
}

export interface UserContacts
{
    id:string;
    email:string;
    phoneNumber:string;
}


export interface UserCredentials
{
    id:string;
    nickname:string;
}
