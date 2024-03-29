'use client';

import signUp from '@/modules/auth/api/auth/signUp';
import { MessageType } from '@/share/consts/errorMessages';
import { registrationSchema } from '@/share/utils/validate';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

export interface SignUpFormFields {
    email: string;
    firstname: string;
    surname: string;
    password: string;
    confirmPassword: string;
}

const SignUpForm = () => {
    const router = useRouter();

    const onSubmit = async (values: SignUpFormFields) => {
        try {
            const data = await signUp(values);
            toast(MessageType.SUCCESSFULL_SIGNUP, {
                autoClose: 10000,
                type: 'success',
            });
            router.push('/');
        } catch (error) {
            toast(MessageType.SERVER_ERROR, {
                autoClose: 10000,
                type: 'error',
            });
        }
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            firstname: '',
            surname: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registrationSchema,
        onSubmit: onSubmit,
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <TextField
                error={!!formik.errors.email && !!formik.touched.email}
                helperText={
                    formik.errors.email && formik.touched.email
                        ? formik.errors.email
                        : ''
                }
                {...formik.getFieldProps('email')}
                type="text"
                name="email"
                label="Email"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <AlternateEmailIcon />
                        </InputAdornment>
                    ),
                }}
            ></TextField>

            <Stack direction="row" spacing={2}>
                <TextField
                    fullWidth={true}
                    error={
                        !!formik.errors.firstname && !!formik.touched.firstname
                    }
                    helperText={
                        formik.errors.firstname && formik.touched.firstname
                            ? formik.errors.firstname
                            : ''
                    }
                    {...formik.getFieldProps('firstname')}
                    type="text"
                    name="firstname"
                    label="Firstname"
                ></TextField>

                <TextField
                    fullWidth={true}
                    error={!!formik.errors.surname && !!formik.touched.surname}
                    helperText={
                        formik.errors.surname && formik.touched.surname
                            ? formik.errors.surname
                            : ''
                    }
                    {...formik.getFieldProps('surname')}
                    type="text"
                    name="surname"
                    label="Surname"
                ></TextField>
            </Stack>

            <Stack direction="row" spacing={2}>
                <TextField
                    fullWidth={true}
                    error={
                        !!formik.errors.password && !!formik.touched.password
                    }
                    helperText={
                        formik.errors.password && formik.touched.password
                            ? formik.errors.password
                            : ''
                    }
                    {...formik.getFieldProps('password')}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="Password"
                    name="password"
                />
                <TextField
                    fullWidth={true}
                    error={
                        !!formik.errors.confirmPassword &&
                        !!formik.touched.confirmPassword
                    }
                    helperText={
                        formik.errors.confirmPassword &&
                        formik.touched.confirmPassword
                            ? formik.errors.confirmPassword
                            : ''
                    }
                    {...formik.getFieldProps('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="Confirm password"
                    name="confirmPassword"
                />
            </Stack>

            <Button
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
            >
                Register
            </Button>
        </form>
    );
};

export default SignUpForm;
