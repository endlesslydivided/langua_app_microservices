'use client'
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { Inter } from "next/font/google";
import { useServerInsertedHTML } from "next/navigation";
import React, { createContext, useEffect, useMemo, useState } from "react";
import createCache from '@emotion/cache';


interface IColorModeContext
{
  toggleColorMode:() => void;
}


const inter = Inter({ subsets: ["latin"] });
export const ColorModeContext = createContext<IColorModeContext | null>({
  toggleColorMode:() => {}
});
type PaletteMode = 'light' | 'dark';


const  ColorModeProvider = (props:any) => {

    const [mode, setMode] = useState<PaletteMode>("light");

    useEffect(()=>
    {
      let colorMode = window.localStorage.getItem('theme') as PaletteMode;
      if(colorMode)
      {
        let value = colorMode;
        setMode(value);       
      }
      else
      {
        setMode('light');       
      }
    },[])

    const theme = React.useMemo(() => createTheme({
      components:
      {
        MuiCardHeader: {
          styleOverrides:{
            root:({theme,ownerState}) =>
            (
              {
                backgroundColor: theme.palette.background.paper,
                
              }
            )
          }
        },
        MuiCardActions: {
          styleOverrides:{
            root:({theme,ownerState}) =>
            (
              {
                backgroundColor: theme.palette.background.paper,
                
              }
            )
          }
        },
        MuiContainer: {
          styleOverrides:{
            root:({theme,ownerState}) =>
            (
              {
                backgroundColor: theme.palette.primary.contrastText,
                
              }
            )
          }
        },
        MuiTypography:
        {
          styleOverrides:{
            root:({theme,ownerState}) =>
            (
              {
                color: theme.palette.text.primary,

              }
            )
          }
        },
        MuiAppBar:
        {
          styleOverrides:{
            root:({theme,ownerState}) =>
            (
              {
              
              }
            )
          }
        }
      },
      palette: {
        mode,
        primary: {
          main: '#22bf44',
        },
        secondary: {
          main: '#ffd54f',
        },
      },
      typography: {
        fontFamily: inter.style.fontFamily,
        fontSize: 14,
        fontWeightLight: 200,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 800,
        button: {
          fontWeight: 500,
          lineHeight: 1.63,
        },
      },
    }), [mode]);
  
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');

          setMode((prevMode: PaletteMode) =>
          {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            return newMode;
          }
          );
        },
      }),
      [],
    );
    
    const { options, children } = props;
  
    const [{ cache, flush }] = useState(() => {
      const cache = createCache(options);
      cache.compat = true;
      const prevInsert = cache.insert;
      let inserted: string[] = [];
      cache.insert = (...args) => {
        const serialized = args[1];
        if (cache.inserted[serialized.name] === undefined) {
          inserted.push(serialized.name);
        }
        return prevInsert(...args);
      };
      const flush = () => {
        const prevInserted = inserted;
        inserted = [];
        return prevInserted;
      };
      return { cache, flush };
    });
  
    useServerInsertedHTML(() => {
      const names = flush();
      if (names.length === 0) {
        return null;
      }
      let styles = '';
      for (const name of names) {
        styles += cache.inserted[name];
      }
      return (
        <style
          key={cache.key}
          data-emotion={`${cache.key} ${names.join(' ')}`}
          dangerouslySetInnerHTML={{
            __html: styles,
          }}
        />
      );
    });
  
    return (
        <CacheProvider value={cache}>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {children}
                    </ThemeProvider>
                </ColorModeContext.Provider>
        </CacheProvider>
    );
  }


export default ColorModeProvider