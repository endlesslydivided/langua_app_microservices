"use client"

import updateUser from "@/modules/auth/api/user/updateUser";
import FinishStepper from "@/modules/auth/components/FinishStepper";
import createVocabulary from "@/modules/vocabularies/api/createVocabulary";
import LanguageSelect from "@/modules/vocabularies/components/LanguageSelect";
import { MessageType } from "@/share/consts/errorMessages";
import useAuth from "@/share/hooks/useAuth";
import { finishRegisterSchema } from "@/share/utils/validate";
import { PhoneSharp } from "@mui/icons-material";
import AbcIcon from '@mui/icons-material/Abc';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import { Box, Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { toast } from "react-toastify";

const steps = ['Choose your native language', 'Choose language you want to learn', 'Finish registration!'];
const icons: { [index: string]: React.ReactElement } = {
    1: <AbcIcon />,
    2: <TranslateIcon />,
    3: <HowToRegOutlinedIcon />,
  };

export interface VocabularyForm
{
    vocabularyNativeLanguage: string;
    language: string;
}

export interface FinishRegisterForm {
    phoneNumber:string,
    city:string,
    country:string,
    sex:string,
    nickname:string,
}

const FinishCard = () => {

    const router = useRouter();
    const {auth,fetchUser} = useAuth();

    const [activeStep, setActiveStep] = useState(0);

    const onVocabularySubmit = async (values: VocabularyForm) => {
        try
        {
            const data = await createVocabulary({...values,userId:auth?.user?.id});
            toast(MessageType.SUCCESSFULL_VOCABULARY, {autoClose: 10000, type: "success" });
        }
        catch(error)
        {
            toast(MessageType.SERVER_ERROR, {autoClose: 10000, type: "error" });
        }

    };

    const vocabularyForm = useFormik({
    initialValues: {
        vocabularyNativeLanguage: "",
        language: "",
    },
    onSubmit: onVocabularySubmit,
    });

    const onFinishRegisterSubmit = async (values: FinishRegisterForm) => {
        try
        {
            const data = await updateUser({...values,id:auth?.user?.id});
            toast(MessageType.SUCCESSFULL_FINISH, {autoClose: 10000, type: "success" });
            fetchUser();
        }
        catch(error)
        {
            toast(MessageType.SERVER_ERROR, {autoClose: 10000, type: "error" });
        }

    };

    const finishRegisterForm = useFormik({
    initialValues: {
        phoneNumber:"",
        city:"",
        country:"",
        sex:"",
        nickname:"",
        birthday:"",
        nativeLanguage:"",
    },
    validationSchema: finishRegisterSchema,
    onSubmit: onFinishRegisterSubmit,
    });


    const handleNext = async () => {    
        if(activeStep === 1)
        {
            await vocabularyForm.submitForm();
        }
        else if(activeStep === 2)
        {
            await finishRegisterForm.submitForm();
        }

        if(activeStep !== 2)
        {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }



    };

    const nextDisabled = () => {    
        switch(activeStep)
        {
            case 0:{
                return !vocabularyForm.values.vocabularyNativeLanguage;
            };
            case 1:{
                return !vocabularyForm.values.language;
            };
            case 2:
            {
                return !finishRegisterForm.isValid;
            }
        }
    };


  return (
    <Card
    sx={{
        p:'14px', 
        display:'flex',flexDirection:'column', 
        justifyContent:'space-between'}}>
        <CardHeader title={`Finish registration. Step ${activeStep +1} of 3`}/>
        <CardContent>
            <Stack spacing={2}>
                <FinishStepper 
                    activeStep={activeStep}
                    icons={icons}
                    steps={steps}       
                />

                <Box >
                
                {   
                    {
                        0:<Stack spacing={2}>  
                            <Typography>
                                Choose the base language:
                            </Typography>
                            <LanguageSelect exclude={["Other"]} label="Base language" fieldProps={vocabularyForm.getFieldProps('vocabularyNativeLanguage')}/>
                            <Typography sx={{color:'gray'}}>
                                The language you know and want your lexical materials to be translated to.
                            </Typography>
                        </Stack>   
                    ,
                        1:<Stack spacing={2}>  
                                <Typography>
                                    Choose the learning language:
                                </Typography>
                                <LanguageSelect exclude={[vocabularyForm.values.vocabularyNativeLanguage,'Other']} label="Learning language" fieldProps={vocabularyForm.getFieldProps('language')}/>
                                <Typography sx={{color:'gray'}}>
                                    The language you would like to learn lexical materials would be presented to you on.
                                </Typography>
                        </Stack>  
                    ,
                        2:<Stack spacing={2}>  
                            <Typography>
                                Tell us some more about yourself:
                            </Typography>
                            <Stack spacing={1}>
                                <TextField 
                                    error={!!finishRegisterForm.errors.phoneNumber && !!finishRegisterForm.touched.phoneNumber }
                                    helperText={finishRegisterForm.errors.phoneNumber && finishRegisterForm.touched.phoneNumber ? finishRegisterForm.errors.phoneNumber : ''}
                                    {...finishRegisterForm.getFieldProps('phoneNumber')}
                                    type="tel"
                                    name="phoneNumber"
                                    label="Phone number"
                                    InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                                    <PhoneSharp/>
                                                </InputAdornment>
                                    }}

                                ></TextField>


                                <Stack direction="row" spacing={2}>

                                    <TextField 
                                        fullWidth
                                        error={!!finishRegisterForm.errors.country && !!finishRegisterForm.touched.country }
                                        helperText={finishRegisterForm.errors.country && finishRegisterForm.touched.country ? finishRegisterForm.errors.country : ''}
                                        {...finishRegisterForm.getFieldProps('country')}
                                        type="text"
                                        name="country"
                                        label="Country"
                                    ></TextField>
                                    <TextField 
                                        fullWidth
                                        error={!!finishRegisterForm.errors.city && !!finishRegisterForm.touched.city }
                                        helperText={finishRegisterForm.errors.city && finishRegisterForm.touched.city ? finishRegisterForm.errors.city : ''}
                                        {...finishRegisterForm.getFieldProps('city')}
                                        type="text"
                                        name="city"
                                        label="City"
                                    ></TextField>
                                </Stack>

                                <TextField 
                                    fullWidth
                                    error={!!finishRegisterForm.errors.nickname && !!finishRegisterForm.touched.nickname }
                                    helperText={finishRegisterForm.errors.nickname && finishRegisterForm.touched.nickname ? finishRegisterForm.errors.nickname : ''}
                                    {...finishRegisterForm.getFieldProps('nickname')}
                                    type="text"
                                    name="nickname"
                                    label="Nickname"
                                ></TextField>

                                <Stack direction="row" spacing={2}>
                                <FormControl  fullWidth>
                                    <FormLabel>Sex:</FormLabel>
                                    <RadioGroup row
                                        {...finishRegisterForm.getFieldProps('sex')}
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </FormControl>

                                <FormControl  fullWidth>
                                    <FormLabel>Birthday:</FormLabel>
                                    <TextField fullWidth type="date"   {...finishRegisterForm.getFieldProps('birthday')} />
                                </FormControl>

                                </Stack>

                                <LanguageSelect  label="Native language" fieldProps={finishRegisterForm.getFieldProps('nativeLanguage')}/>


                            </Stack>
                            <Typography sx={{color:'gray'}}>
                                Your data will be kept private!
                            </Typography>
                        </Stack> 
                    }[activeStep]
                }
                </Box>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'end', pt: 2 }}>
                <Button onClick={handleNext} variant="contained" disabled={nextDisabled()}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </CardContent>
    </Card>
  )
}

export default FinishCard