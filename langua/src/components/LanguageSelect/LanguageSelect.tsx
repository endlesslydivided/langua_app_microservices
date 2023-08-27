import countries from '@/assets/countriers'
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { FieldInputProps } from 'formik';
import React from 'react'

interface LanguageSelectProps
{
    label:string;
    fieldProps: FieldInputProps<any>;
    exclude?:string[];
    include?:typeof countries;
}

const LanguageSelect:React.FC<LanguageSelectProps> = ({label,fieldProps,exclude,include = []}) => {
  return (
    <FormControl fullWidth>
        <InputLabel sx={{background:'white'}}>{label}</InputLabel>
        <Select   
            sx={{'& .MuiSelect-select':{display:'flex', flexDirection:'row', alignItems:'center'}}}
            
            {...fieldProps}>
            {
                countries
                .filter((c) => !exclude?.some((e) => e === c.language))         
                .map((item:any) =>
                <MenuItem value={item.language} >
                    {
                       item.alpha2 && <img loading="lazy" width="20" src={`https://flagcdn.com/w20/${item.alpha2.toLowerCase()}.png`}
                       srcSet={`https://flagcdn.com/w40/${item.alpha2.toLowerCase()}.png 2x`}
                       />
                    }
                    {
                        (item.alpha2 && ' ') + item.language
                    }
                </MenuItem>)
            }
        </Select>
    </FormControl>
    )
}

export default LanguageSelect