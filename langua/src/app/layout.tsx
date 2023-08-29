'use client'

import "./globals.scss";
import React from "react";

import 'react-toastify/dist/ReactToastify.css';
import { Container, StyledEngineProvider } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AuthProvider from "@/modules/auth/components/AuthProvider";
import BranchProvider from "@/share/components/BranchProvider";
import ColorModeProvider from "@/share/components/ColorModerProvider";
import ErrorBoundary from "@/share/components/ErrorBoundary";
import ToastProvider from "@/share/components/ToastProvider";






export default function RootLayout({
  auth,
  authorized,
  finish,
  choice
}: {
  auth: React.ReactNode;
  authorized: React.ReactNode;
  finish: React.ReactNode;
  choice: React.ReactNode;

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
                      <BranchProvider auth={auth} authorized={authorized} finish={finish} choice={choice}/>
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
