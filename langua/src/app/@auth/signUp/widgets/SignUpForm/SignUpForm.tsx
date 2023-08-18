'use client'

import { SignUpForm } from '@/app/@auth/types';
import { MessageType, useNotify } from '@/hooks/useNotify';
import signUpFetch from '@/lib/auth/signUp';
import { registrationSchema } from '@/lib/validate';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignUpForm = () => {

    const {notify} = useNotify();
    const router = useRouter();


    const onSubmit = async (values: SignUpForm) => {
        try
        {
            const data = await signUpFetch(values);
            notify({
                text: "You was registered successfully!",
                type: "success",
                messageType: MessageType.SUCCESS
            });
            router.push('/');
        }
        catch(error)
        {
            notify({messageType:MessageType.SERVER_ERROR,type:"error"})
        }

    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
    initialValues: {
        email: "",
        firstname: "",
        surname: "",
        password:"",
        confirmPassword:""
    },
    validationSchema: registrationSchema,
    onSubmit: onSubmit,
    });

    return (
        <form className="flex flex-col col-span-2 gap-4" onSubmit={formik.handleSubmit}>

            <TextField 
                error={!!formik.errors.email && !!formik.touched.email }
                helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                {...formik.getFieldProps('email')}
                type="text"
                name="email"
                placeholder="Email"
                InputProps={{
                endAdornment: <InputAdornment position="end">
                                <AlternateEmailIcon/>
                            </InputAdornment>
                }}
            
            ></TextField>
           

            <div className="grid grid-cols-2 gap-5">

                <TextField 
                    error={!!formik.errors.firstname && !!formik.touched.firstname }
                    helperText={formik.errors.firstname && formik.touched.firstname ? formik.errors.firstname : ''}
                    {...formik.getFieldProps('firstname')}
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                ></TextField>
                <TextField 
                    error={!!formik.errors.surname && !!formik.touched.surname }
                    helperText={formik.errors.surname && formik.touched.surname ? formik.errors.surname : ''}
                    {...formik.getFieldProps('surname')}
                    type="text"
                    name="surname"
                    placeholder="Surname"
                ></TextField>
            </div>

          
            <div className="grid grid-cols-2 gap-5">
                <TextField 
                    error={!!formik.errors.password && !!formik.touched.password }
                    helperText={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
                    {...formik.getFieldProps('password')}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        
                    }}
                    
                    label="Password"
                    name="password"
                    placeholder="Password"       
                />
                <TextField 
                    error={!!formik.errors.confirmPassword && !!formik.touched.confirmPassword }
                    helperText={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
                    {...formik.getFieldProps('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        
                    }}
                    
                    label="Confirm password"
                    name="confirmPassword"
                    placeholder="Confrim password"       
                />
            </div>

            <Button 
            type="submit"
            className="p-3 rounded-lg !bg-gradient-to-r !from-purple-500 !to-violet-500"
            variant="contained"
            color='secondary'>
                Register
            </Button>      
        </form>
  )
}

export default SignUpForm