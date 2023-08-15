import { error } from "console";
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").min(8).max(25).matches(/^\S*$/)
})


export const registrationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").min(8).max(25).matches(/^\S*$/),
    confirmPassword: Yup.string().required("Confirm passwor is required").min(8).max(25).matches(/^\S*$/)
        .oneOf([Yup.ref('password'),''],"Passwords are not equal"),
    firstname: Yup.string().required("Firstname is required").min(1).max(255).matches(/^\S*$/),
    surname:  Yup.string().required("Surname is required").min(1).max(255).matches(/^\S*$/),
})
