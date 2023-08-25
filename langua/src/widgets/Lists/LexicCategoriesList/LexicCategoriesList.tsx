'use client'
import crazyStart from "@/assets/abstractBG/crazyStarBG.gif";
import hexColumns from "@/assets/abstractBG/hexColumns.gif";
import multiSquares from "@/assets/abstractBG/multiSquares.gif";
import pinkCyanWaves from "@/assets/abstractBG/pinkCyanWaves.gif";
import Loading from "@/components/Loading/Loading";
import findManyLexicCategories from "@/share/fetch/lexicCategory/findManyLexicCategories";
import useFetch from "@/share/hooks/useFetch";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Card, List, ListItem, ListItemText, useTheme } from "@mui/material";


const LexicCategoriesList = () => {

    const  backgrounds = [crazyStart,hexColumns,pinkCyanWaves,multiSquares];

    const randomBg = (index:number) => backgrounds[index % 3]

    const {loading,data,filters,setFilters} = useFetch({
        fetch: findManyLexicCategories
    })

    const theme = useTheme()

    return (
            loading ? <Loading/> :
            <List>
                {data.map((lexicCategory,index) =>
                
                    <ListItem 
                    key={lexicCategory.id}
                      >
                        <Card  sx={{
                            display:'flex',
                            backgroundImage:` linear-gradient(
                                to right,
                                rgba(255, 255, 255, 1), 80%,
                                rgba(255, 255, 255, 0.5)
                              ), url(${randomBg(index).src})`,
                            backgroundRepeat:'no-repeat',
                            backgroundSize:'20%',
                            backgroundPosition:'right',
                            width:'100%', 
                            padding:'20px',
                            ":hover":{filter:'brightness(0.95)'},
                            }}>      
                            <ListItemText
                                primary={lexicCategory.categoryName}
                            />
                            <Box>
                                <Button variant="contained" startIcon={<VisibilityIcon/>}>
                                     View
                                </Button>
                                
                            </Box>
                               
                        </Card>
                    </ListItem>
                )}
            </List>
            
    )
}

export default LexicCategoriesList