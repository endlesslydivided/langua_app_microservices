import createLexicCategory from '@/modules/lexicCategories/api/createLexicCategory';
import createWord from '@/modules/words/api/createWord';
import { MessageType } from '@/share/consts/errorMessages';
import { BaseException } from '@/share/exceptions/base.exception';
import useAuth from '@/share/hooks/useAuth';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export const wordSchema = Yup.object().shape({
    word: Yup.string().label('Word').required().min(1).max(255),
    transcription: Yup.string()
        .label('Transcription')
        .required()
        .min(1)
        .max(255),
    translation: Yup.string().label('Translation').required().min(1).max(255),
});

export interface CreateWordFormFields {
    word: string;
    transcription: string;
    translation: string;
    language: string;
    nativeWordLanguage: string;
    lexicCategoryId: string;
}

interface CreateWordProps {
    lexicCategoryId: string;
    creationCallback: () => void;
}

const CreateWordForm: React.FC<CreateWordProps> = ({
    lexicCategoryId,
    creationCallback,
}) => {
    const { auth } = useAuth();

    const handleFormSubmit = async (values: CreateWordFormFields) => {
        try {
            await createWord(values);
            creationCallback();
        } catch (error: BaseException | any) {
            toast(error.reason ?? MessageType.SERVER_ERROR, {
                autoClose: 10000,
                type: 'error',
            });
        }
    };

    const wordForm = useFormik({
        initialValues: {
            word: '',
            transcription: '',
            translation: '',
            lexicCategoryId: lexicCategoryId,
            language: auth.currentVocabulary?.language || '',
            nativeWordLanguage:
                auth.currentVocabulary?.vocabularyNativeLanguage || '',
        },
        onSubmit: handleFormSubmit,
        validationSchema: wordSchema,
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={wordForm.handleSubmit}>
            <TextField
                error={!!wordForm.errors.word && !!wordForm.touched.word}
                helperText={
                    wordForm.errors.word && wordForm.touched.word
                        ? wordForm.errors.word
                        : ''
                }
                {...wordForm.getFieldProps('word')}
                type="text"
                name="word"
                label="Word"
            ></TextField>

            <TextField
                error={
                    !!wordForm.errors.transcription &&
                    !!wordForm.touched.transcription
                }
                helperText={
                    wordForm.errors.transcription &&
                    wordForm.touched.transcription
                        ? wordForm.errors.transcription
                        : ''
                }
                {...wordForm.getFieldProps('transcription')}
                type="text"
                name="transcription"
                label="Transcription"
            ></TextField>

            <TextField
                error={
                    !!wordForm.errors.translation &&
                    !!wordForm.touched.translation
                }
                helperText={
                    wordForm.errors.translation && wordForm.touched.translation
                        ? wordForm.errors.translation
                        : ''
                }
                {...wordForm.getFieldProps('translation')}
                type="text"
                name="translation"
                label="Translation"
            ></TextField>

            <Button
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
            >
                Create
            </Button>
        </form>
    );
};

export default CreateWordForm;
