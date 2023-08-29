'use client'
import findManyVocabulariesByUserId from "@/modules/vocabularies/api/findManyVocabulariesByUserId";
import VocabulariesList from "@/modules/vocabularies/widgets/Lists/VocabulariesList";
import Scrollbar from "@/share/components/Scrollbar";
import useAuth from "@/share/hooks/useAuth";
import useFetch from "@/share/hooks/useFetch";
import { Card, CardContent, CardHeader, Pagination } from '@mui/material';



const VocabulariecChoiceCard = () => {
    const {auth} = useAuth();

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setFilters((p) => ({...p,page:value}));
    };

    const {loading,data,filters,setFilters,count,totalPages} = useFetch({
        fetch: findManyVocabulariesByUserId,
        params:
        {
            userId: auth.user?.id
        }
    })

    return (
        <Card
        sx={{
            width:'75%',
            height:'75%',
            p:'14px',
            
           }}>
            <CardHeader title={`Choose your vocabulary:`} />
            <Pagination count={totalPages} onChange={handlePaginationChange} page={filters.page} variant="outlined" />
            <CardContent sx={{display:'flex',justifyContent:'center',m:'10px'}}>
                <Scrollbar sx={{height: 1, '& .simplebar-content': {height: 1, display: 'flex', flexDirection: 'column'}}}>
                    <VocabulariesList loading={loading} data={data}/>
                </Scrollbar>
            </CardContent>

        </Card>
    )
}

export default VocabulariecChoiceCard