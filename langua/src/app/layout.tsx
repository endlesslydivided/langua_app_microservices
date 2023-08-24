'use client'

import { ThemeProvider, alpha, createTheme, getContrastRatio } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";

import "./globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { ToastProvider, AuthProvider } from "@/components/context";
import BranchProvdier from "@/components/context/BranchProvider";


const greenBase = '#22bf44';
const greenMain = alpha(greenBase, 0.7);

const inter = Inter({ subsets: ["latin"] });


const theme = createTheme({
 typography:
 {
  fontFamily:inter.style.fontFamily
 },
 palette:
 {
  primary: {
    main: greenMain,
    light: alpha(greenBase, 0.5),
    dark: alpha(greenBase, 0.9),
    contrastText: getContrastRatio(greenMain, '#fff') > 4.5 ? '#fff' : '#111',
  }
 }
});

export default function RootLayout({
  auth,
  authorized,
}: {
  auth: React.ReactNode;
  authorized: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <ErrorBoundary>
              <AuthProvider>
                <BranchProvdier auth={auth} authorized={authorized}/>
              </AuthProvider>
            </ErrorBoundary>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
