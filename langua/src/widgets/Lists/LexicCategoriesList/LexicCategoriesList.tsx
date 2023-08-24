'use client'
import Loading from "@/components/Loading/loading";
import findManyLexicCategories from "@/share/fetch/lexicCategory/findManyLexicCategories";
import useFetch from "@/share/hooks/useFetch";
import { Box, Typography } from "@mui/material";

const LexicCategoriesList = async () => {


    const {loading,data,filters,setFilters} = useFetch({
        fetch: findManyLexicCategories
    })

    return (
        <Box>
            <Typography>
                {loading ? <Loading/> : JSON.stringify(data)}
            </Typography>   
        </Box>
    )
}

export default LexicCategoriesList