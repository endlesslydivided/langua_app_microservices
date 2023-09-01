import { useContext } from "react";
import { ColorModeContext } from "../components/ColorModerProvider";


const useColorMode = () => {

    const context = useContext(ColorModeContext);

    if(!context)
    {
        throw Error('Theme context is null')
    }

    return {...context};
}

export default useColorMode
