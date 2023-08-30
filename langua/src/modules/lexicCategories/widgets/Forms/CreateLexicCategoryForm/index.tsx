import createLexicCategory from '@/modules/lexicCategories/api/createLexicCategory';
import { MessageType } from '@/share/consts/errorMessages';
import useAuth from '@/share/hooks/useAuth'
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import * as Yup from 'yup';


export const lcSchema = Yup.object().shape({
    categoryName: Yup.string().label('Category name').required().min(1).max(50),
})

export interface CreateLexicCategoryFormFields {
    categoryName: string;
    nativeCategoryLanguage: string;
    language: string;
    creatorUserId: string;
}

interface CreateLexicCategoryProps
{
    creationCallback: () => void
}


const CreateLexicCategoryForm:React.FC<CreateLexicCategoryProps> = ({creationCallback}) => {

    const {auth} = useAuth();
    const router = useRouter();

    const handleFormSubmit = async (values: CreateLexicCategoryFormFields) => {
        try
        {
            const data = await createLexicCategory(values);
            creationCallback();
        }
        catch(error:any)
        {
            toast(error.reason ?? MessageType.SERVER_ERROR, {autoClose: 10000, type: "error" });
        }

    };

    const lcForm = useFormik({
        initialValues:
        {
            categoryName: "",
            creatorUserId: auth.user?.id || '',
            language: auth.currentVocabulary?.language || '',
            nativeCategoryLanguage: auth.currentVocabulary?.vocabularyNativeLanguage || ''
        },
        onSubmit: handleFormSubmit,
        validationSchema:lcSchema
    })


  return (
    <form className="flex flex-col gap-5" onSubmit={lcForm.handleSubmit}>

            <TextField 
                error={!!lcForm.errors.categoryName && !!lcForm.touched.categoryName }
                helperText={lcForm.errors.categoryName && lcForm.touched.categoryName ? lcForm.errors.categoryName : ''}
                {...lcForm.getFieldProps('categoryName')}
                type="text"
                name="categoryName"
                label="Category name"
                
            ></TextField>
        
        <Button 
            type="submit"
            size='large'
            variant="contained"
            color='secondary'>
                Create
        </Button>      
    </form>
  )
}

export default CreateLexicCategoryForm