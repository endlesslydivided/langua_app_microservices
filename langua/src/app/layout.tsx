"use client"
import { ThemeProvider, alpha, createTheme, getContrastRatio } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthProvider from "./context/AuthProvider";
import BranchProvdier from "./context/BranchProvider";
import ToastProvider from "./context/ToastProvider";
import "./globals.scss";
 //add this line


const greenBase = '#22bf44';
const greenMain = alpha(greenBase, 0.7);

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Langua",
};

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
