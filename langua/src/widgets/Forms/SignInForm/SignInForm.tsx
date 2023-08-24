'use client'
import { FRONT_URI } from '@/consts/api';
import { MessageType } from '@/consts/errorMessages';
import { loginSchema } from '@/lib/validate';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { SignInForm } from '../../types';
import signIn from '@/lib/auth/signIn';
import { RedirectType } from 'next/dist/client/components/redirect';
import { AuthContext } from '@/app/context/AuthProvider';
import useAuth from '@/hooks/useAuth';

const SignInForm = () => {

    const router = useRouter();
    const [loading,setLoading] = useState(false);

    const {fetchUser} = useAuth();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (values: SignInForm) => {
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
            placeholder="Email"
            
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
            placeholder="Password"       
            />
          
            <LoadingButton 
            className="p-3 rounded-lg !bg-gradient-to-r !from-purple-500 !to-violet-500"
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