import dayjs from 'dayjs';
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().label('Email').required().email(),
    password: Yup.string().label('Password').required().min(8).max(25).matches(/^\S*$/)
})


export const registrationSchema = Yup.object().shape({
    email: Yup.string().label('Email').required().email(),
    password: Yup.string().label('Password').required().min(8).max(25).matches(/^\S*$/),
    confirmPassword: Yup.string().label('Confirm password').required().min(8).max(25).matches(/^\S*$/)
        .oneOf([Yup.ref('password'),''],"Passwords are not equal"),
    firstname: Yup.string().label('Firstname').required().min(1).max(255).matches(/^\S*$/),
    surname:  Yup.string().label('Surname').required().min(1).max(255).matches(/^\S*$/),
})


export const finishRegisterSchema = Yup.object().shape({
    phoneNumber: Yup.string().label('Phone number').required(),
    city: Yup.string().label('City').required().min(1).max(50),
    country: Yup.string().label('Country').required().min(1).max(50),
    sex: Yup.string().label('Sex value').required(),
    nickname: Yup.string().label('Nickname').required().min(1).max(25).matches(/^\S*$/),
    nativeLanguage: Yup.string().label('Native language').required(),
    birthday: Yup.date().label('Birthday').required().test(
        "test-future",
        "Date is invalid",
        (value) => dayjs(value).isBefore(dayjs())
      ),

})