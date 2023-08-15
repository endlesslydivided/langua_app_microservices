
import { loginSchema } from '@/lib/validate';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const SignInForm = () => {

    const handleGoogleSignin = async () => {
        signIn("google", { callbackUrl: "http://localhost:3000" });
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (values: SignInForm) => {
        console.log(values);
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
          
            <Button 
            className="p-3 rounded-lg !bg-gradient-to-r !from-purple-500 !to-violet-500"
            variant="contained"
            color='secondary'>
                Login
            </Button>

            <Button 
            className="border p-3 rounded-none bg-white text-black  border-neutral-900 hover:bg-gray-200"
            variant="outlined"
            endIcon={<FcGoogle size={25} className="self-center" />}
            >
                Sign In with Google
            </Button>

          
        </form>
  )
}

export default SignInForm