interface SignUpInput
{
    birthday:  string,
    city: string,
    country: string,
    email: string,
    firstname: string,
    nativeLanguage: string,
    nickname: string,
    password: string,
    phoneNumber: string,
    sex: 'man' | 'woman',
    surname: string
}

interface SignInInput
{
    email: string,
    password: string
}
