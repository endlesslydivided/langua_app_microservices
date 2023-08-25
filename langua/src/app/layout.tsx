'use client'

import React from "react";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { AuthProvider, ToastProvider } from "@/components/context";
import BranchProvdier from "@/components/context/BranchProvider";
import ColorModeProvider from "@/components/context/ColorModeProvider";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.scss";





export default function RootLayout({
  auth,
  authorized,
}: {
  auth: React.ReactNode;
  authorized: React.ReactNode;
}) {

  
  return (
    <html lang="en">
      <body>
          <ColorModeProvider options={{ key: 'mui' }}>
            <ToastProvider>
              <ErrorBoundary>
                <AuthProvider>
                  <BranchProvdier auth={auth} authorized={authorized}/>
                </AuthProvider>
              </ErrorBoundary>
            </ToastProvider>
          </ColorModeProvider>
      </body>
    </html>
  );
}
