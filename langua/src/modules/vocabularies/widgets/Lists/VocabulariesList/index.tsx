
import { Vocabulary } from "@/modules/vocabularies/types/model";
import Loading from "@/share/components/Loading";
import useAuth from "@/share/hooks/useAuth";
import BookIcon from '@mui/icons-material/Book';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import { FC } from "react";
interface VocabulariesListProps
{
    data: Vocabulary[];
    loading: boolean;
}

const VocabulariesList:FC<VocabulariesListProps> = ({data,loading}) => {
    
    const {setCurrentVocabulary} = useAuth();

    const vocabularyChooseHandler = (vocabulary:Vocabulary) =>
    {
        setCurrentVocabulary(vocabulary);
    }
   
    return (
            loading ? <Loading/> :

            data.length === 0 ? <Typography>No data</Typography>:

            <Grid container spacing={2}>

                {data.map((vocabulary,index) =>
                    <>
                      <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>
                    <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>  <Grid item key={vocabulary.id} xs={6}>
                        <Card  
                        sx={{
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                        }}>  
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>    
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="error">
                                <CancelIcon/>
                            </IconButton>
                            <Typography>
                                {vocabulary.language} {'->'} {vocabulary.vocabularyNativeLanguage}
                            </Typography>
                        </Box>
                            <IconButton onClick={() => vocabularyChooseHandler(vocabulary)} color="primary">
                                <BookIcon/>
                            </IconButton>                   
                        </Card>
                    </Grid>
                    </>
                  
                    
                )} 
            </Grid>                    
            
    )
}

export default VocabulariesList