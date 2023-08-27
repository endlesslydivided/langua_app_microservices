'use client'

import "./globals.scss";
import React from "react";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { AuthProvider, ToastProvider } from "@/components/context";
import BranchProvdier from "@/components/context/BranchProvider";
import ColorModeProvider from "@/components/context/ColorModeProvider";
import 'react-toastify/dist/ReactToastify.css';
import { StyledEngineProvider } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';





export default function RootLayout({
  auth,
  authorized,
  finish,
}: {
  auth: React.ReactNode;
  authorized: React.ReactNode;
  finish: React.ReactNode;

}) {

  
  return (
    <html lang="en">
      <body>
      <StyledEngineProvider injectFirst>
          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <ColorModeProvider options={{ key: 'mui' }}>
              <ToastProvider>
                <ErrorBoundary>
                  <AuthProvider>
                    <BranchProvdier auth={auth} authorized={authorized} finish={finish}/>
                  </AuthProvider>
                </ErrorBoundary>
              </ToastProvider>
            </ColorModeProvider>    
          </LocalizationProvider>
        </StyledEngineProvider >
      </body>
    </html>
  );
}
