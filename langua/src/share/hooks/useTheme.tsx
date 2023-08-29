import { useTheme } from "@mui/material";


const useMUITheme = () => {

    const context = useTheme();

    if(!context)
    {
        throw Error('Theme context is null')
    }

    return context;
}

export default useTheme
