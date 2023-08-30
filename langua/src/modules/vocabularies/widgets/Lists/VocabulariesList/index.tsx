
import { Vocabulary } from "@/modules/vocabularies/types/model";
import Loading from "@/share/components/Loading";
import useAuth from "@/share/hooks/useAuth";
import { List, Typography } from "@mui/material";
import { FC } from "react";
import VocabulariesListItem from "./VocabulariesListItem";
interface VocabulariesListProps
{
    data: Vocabulary[];
    loading: boolean;
}

const VocabulariesList:FC<VocabulariesListProps> = ({data,loading}) => {
    
   
    return (
            loading ? <Loading/> : data.length === 0 ? <Typography>No data</Typography>
            :
            <List sx={{width:'100%'}}>
                {data.map((value,index,array) =><VocabulariesListItem index={index} value={value} array={array}/>)} 
            </List>                    
            
    )
}

export default VocabulariesList