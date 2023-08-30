'use client'
import crazyStar from "@/assets/abstractBG/crazyStarBG.gif";
import hexColumns from "@/assets/abstractBG/hexColumns.gif";
import multiSquares from "@/assets/abstractBG/multiSquares.gif";
import pinkCyanWaves from "@/assets/abstractBG/pinkCyanWaves.gif";
import { LexicCategory } from "@/modules/lexicCategories/types/model";
import CirculearLoader from "@/share/components/CircularLoader";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Card, List, ListItem, ListItemText } from "@mui/material";

interface LexicCategoriesListProps
{
    data:LexicCategory[];
    loading:boolean;
}

const LexicCategoriesList:React.FC<LexicCategoriesListProps> = ({loading,data}) => {

    const  backgrounds = [crazyStar,hexColumns,pinkCyanWaves,multiSquares];

    const randomBg = (index:number) => backgrounds[index % 3]
    
    const cardSx = (index:number) => ({
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
    })

    return (
            loading ? <CirculearLoader/> :
            data.length === 0 ? 'No data' :
            <List>
                {data.map((lexicCategory,index) =>
                <>
                <ListItem key={lexicCategory.id}>
                        <Card sx={cardSx(index)}>      
                            <ListItemText primary={lexicCategory.categoryName}/>
                            <Box>
                                <Button variant="contained" startIcon={<VisibilityIcon/>}>
                                     View
                                </Button>            
                            </Box>               
                        </Card>
                    </ListItem>
                    <ListItem key={lexicCategory.id}>
                        <Card sx={cardSx(index)}>      
                            <ListItemText primary={lexicCategory.categoryName}/>
                            <Box>
                                <Button variant="contained" startIcon={<VisibilityIcon/>}>
                                     View
                                </Button>            
                            </Box>               
                        </Card>
                    </ListItem>
                    <ListItem key={lexicCategory.id}>
                        <Card sx={cardSx(index)}>      
                            <ListItemText primary={lexicCategory.categoryName}/>
                            <Box>
                                <Button variant="contained" startIcon={<VisibilityIcon/>}>
                                     View
                                </Button>            
                            </Box>               
                        </Card>
                    </ListItem>
                </>
                   
                )}
            </List>
            
    )
}

export default LexicCategoriesList