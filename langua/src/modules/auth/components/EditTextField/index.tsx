import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

interface EditTextFieldProps
{
    initialValues:any;
    onSubmit: (values:any) => void;
    name:string;
    validationSchema:  any | (() => any);
    type: React.InputHTMLAttributes<unknown>['type'];
    label:string;

}

const EditTextField:React.FC<EditTextFieldProps> = ({initialValues,onSubmit,name,validationSchema,type,label}) => {

    const [editMode,setEditMode] = React.useState(false);

    const form = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const onClickEditHandler = () =>
    {
        setEditMode((p) => !p)
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
                <CheckIcon color={'primary'} onClick={onSubmitEditionHandler}/>
                <CloseIcon color={'error'} onClick={onClickEditHandler}/>
            </Stack>
            :
            <EditIcon onClick={onClickEditHandler}/>}
    </InputAdornment>

    return (
    <TextField 
        error={!!form.errors?.[name] && !!form.touched?.[name] }
        helperText={(form.errors?.[name] && form.touched?.[name] ? form.errors?.[name] : '') as React.ReactNode}
        {...form.getFieldProps(name)}
        type={type}
        name={name}
        label={label}
        InputProps={{endAdornment}}

    ></TextField>
    )
}

export default EditTextField