'use client'

import signIn from '@/modules/auth/api/auth/signIn';
import { FRONT_URI } from '@/share/consts/api';
import { MessageType } from '@/share/consts/errorMessages';
import useAuth from '@/share/hooks/useAuth';
import { loginSchema } from '@/share/utils/validate';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export interface SignInFormFields {
  email: string;
  password: string;
}

const SignInForm = () => {

    const router = useRouter();
    const [loading,setLoading] = useState(false);

    const {fetchUser} = useAuth();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (values: SignInFormFields) => {
        try
        {
            const callbackUrl = FRONT_URI || "/";
            setLoading(true);
            const res = await signIn({email: values.email, password: values.password,});
              
            if (res?.error) {
              throw res?.error;         
            } 
            fetchUser();

        }
        catch(error)
        {
          toast(MessageType.INVALID_CREDENTIALS, {autoClose: 10000, type: "error" });
        }
        finally
        {
          setLoading(false);
        }
       
    };

    const formik = useFormik({
    initialValues: {
        email: "",
        password: "",
    },
    validationSchema: loginSchema,
    onSubmit: onSubmit,
    });
        
  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>

        <TextField 
            error={!!formik.errors.email && !!formik.touched.email }
            helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
            {...formik.getFieldProps('email')}
            type="email"
            name="email"
            label="Email"
            
            InputProps={{
            endAdornment: <InputAdornment position="end">
                            <AlternateEmailIcon/>
                        </InputAdornment>
            }}
         
        ></TextField>
        
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
            />
          
            <LoadingButton 
            size='large'
            variant="contained"
            loading={loading}
            type="submit"
            color='secondary'>
                Login
            </LoadingButton>          
        </form>
  )
}

export default SignInForm