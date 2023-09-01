'use client'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, InputAdornment, Stack, SxProps,TextField, Theme } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';

interface EditTextFieldProps
{
    initialValues:any;
    onSubmit: (values:any) => void;
    name:string;
    validationSchema:  any | (() => any);
    type: React.InputHTMLAttributes<unknown>['type'];
    label:string;
    sx?: SxProps<Theme>;
    setInitialValues: React.Dispatch<React.SetStateAction<Record<string,string>>>
}

const EditTextField:React.FC<EditTextFieldProps> = ({setInitialValues,initialValues,onSubmit,name,validationSchema,type,label,sx}) => {

    const [editMode,setEditMode] = useState(false);

    const beforeEdition = {...initialValues};

    const form = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const onClickEditHandler = () =>
    {
        setEditMode((p) => !p)
    }

    const onClickCloseForm = () =>
    {
        onClickEditHandler();
        setInitialValues((p) => ({...p,[name]:beforeEdition[name]}))
    }

    const onSubmitEditionHandler =  async () =>
    {
        await form.submitForm();
    }

    const endAdornment =    
    <InputAdornment position="end">
        {
            editMode ? 
            <Stack direction={"row"}>
                <IconButton>
                    <CheckIcon color={'primary'} onClick={onSubmitEditionHandler}/>
                </IconButton>
                <IconButton>
                    <CloseIcon color={'error'} onClick={() => onClickCloseForm()}/>
                </IconButton>

            </Stack>
            :
            <IconButton>
                <EditIcon onClick={onClickEditHandler}/>
            </IconButton>

            }
    </InputAdornment>

    return (
    <TextField
        sx={sx}
        error={!!form.errors?.[name] && !!form.touched?.[name] }
        helperText={(form.errors?.[name] && form.touched?.[name] ? form.errors?.[name] : '') as React.ReactNode}
        {...form.getFieldProps(name)}
        type={type}
        name={name}
        label={label}
        InputProps={{endAdornment}}
        disabled={!editMode}
    ></TextField>
    )
}

export default EditTextField