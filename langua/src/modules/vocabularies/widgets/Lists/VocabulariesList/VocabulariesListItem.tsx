'use client'

import countries from "@/assets/countriers";
import { Vocabulary } from "@/modules/vocabularies/types/model";
import useAuth from "@/share/hooks/useAuth";
import BookIcon from '@mui/icons-material/Book';
import { Box, Divider, IconButton, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

interface VocabulariesListItemProps
{
    index:number;
    value: Vocabulary;
    array: Vocabulary[];
}

const VocabulariesListItem:FC<VocabulariesListItemProps> = ({index,value,array}) => {

    const {setCurrentVocabulary} = useAuth();

    const vocabularyLanguage = countries.find((i) => i.language === value.language);
    const vocabularyNativeLanguage = countries.find((i) => i.language === value.vocabularyNativeLanguage);

    const vocabularyChooseHandler = (vocabulary:Vocabulary) =>
    {
        setCurrentVocabulary(vocabulary);
    }

    return (
        <>
            {index !== 0 ? <Divider/> : null}
            <ListItem sx={(theme) => ({
                display: 'flex',
                flexDirection:'row',
                alignItems:'center',
                backgroundColor: index % 2 !== 0 ? theme.palette.background.default : theme.palette.grey[100],
                justifyContent:'space-between',
                ":hover":{filter:'brightness(0.95)'},
            })}>  
            <Box sx={{ 
                display:"flex",
                flexDirection:'row',
                gap:'10px',
                cursor:"pointer",
                alignItems:'center'
            }}>    
                <Image
                loading="lazy" loader={({src}) => src} height={10} width={20} alt="language"  
                src={`https://flagcdn.com/w20/${vocabularyLanguage?.alpha2.toLowerCase()}.png`}/>                                  
                {
                    vocabularyLanguage?.language + ' -> '
                }
                <Image loading="lazy" loader={({src}) => src}   
                height={10} width={20} alt="nativeLanguage" 
                src={`https://flagcdn.com/w20/${vocabularyNativeLanguage?.alpha2.toLowerCase()}.png`}/>               
                {
                    vocabularyNativeLanguage?.language
                }
            </Box>
                <IconButton onClick={() => vocabularyChooseHandler(value)} color="primary">
                    <BookIcon/>
                </IconButton>                   
            </ListItem>
        </>
    )
}

export default VocabulariesListItem