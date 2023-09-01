'use client'

import updateUser from '@/modules/auth/api/user/updateUser';
import EditTextField from '@/modules/auth/components/EditTextField';
import { MessageType } from '@/share/consts/errorMessages';
import useAuth from '@/share/hooks/useAuth';
import { updateUserSchema } from '@/share/utils/validate';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface EditProfileFields {
    phoneNumber:string,
    city:string,
    country:string,
    nickname:string,
    firstname:string,
    surname:string
}

const EditProfileForm = () => {

    const router = useRouter();
    const [loading,setLoading] = useState(false);

    const {fetchUser,auth} = useAuth();

    const [initialValues,setInitialValues] = useState<Record<string,string>>({
        id:auth.user?.id || '',
        phoneNumber:auth.user?.userContacts.phoneNumber || '',
        city:auth.user?.city || '',
        country:auth.user?.country || '',
        nickname:auth.user?.userCredentials.nickname || '',
        firstname:auth.user?.firstname || '',
        surname:auth.user?.surname || ''
    })

    const onSubmit = async (values: EditProfileFields) => {
        try
        {
            setLoading(true);
            const res = await updateUser(values);
              
            if (res?.error) {
              throw res?.error;         
            } 
            fetchUser();

        }
        catch(error:any)
        {
          toast(error.reason ?? MessageType.INVALID_CREDENTIALS, {autoClose: 10000, type: "error" });
        }
        finally
        {
          setLoading(false);
        }
       
    };

        
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'15px'}}>

        <EditTextField
            setInitialValues={setInitialValues}
            initialValues={initialValues}
            onSubmit={onSubmit}
            name='phoneNumber'
            type="tel"
            validationSchema={updateUserSchema}
            label="Phone number"
        />
        <Stack direction="row"  spacing={1}>
            <EditTextField
                setInitialValues={setInitialValues}
                sx={{width:'50%'}}
                initialValues={initialValues}
                onSubmit={onSubmit}
                name='country'
                type="text"
                validationSchema={updateUserSchema}
                label="Country"
            />
            <EditTextField
                setInitialValues={setInitialValues}
                sx={{width:'50%'}}
                initialValues={initialValues}
                onSubmit={onSubmit}
                name='city'
                type="text"
                validationSchema={updateUserSchema}
                label="City"
            />
        </Stack>

        <Stack direction="row"  spacing={1}>
            <EditTextField
                setInitialValues={setInitialValues}
                sx={{width:'50%'}}
                initialValues={initialValues}
                onSubmit={onSubmit}
                name='firstname'
                type="text"
                validationSchema={updateUserSchema}
                label="Firstname"
            />
            <EditTextField
                setInitialValues={setInitialValues}
                sx={{width:'50%'}}
                initialValues={initialValues}
                onSubmit={onSubmit}
                name='surname'
                type="text"
                validationSchema={updateUserSchema}
                label="Surname"
            />
        </Stack>
        
         
    </Box>
  )
}

export default EditProfileForm