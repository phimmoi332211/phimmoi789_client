'use client';
import { FavoriteProvider } from "@/context/FavoriteContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr/_internal';
import { AuthProvider } from "@/context/AuthContext";
interface AppProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        refreshInterval: 0,

        errorRetryInterval: 1000,
        errorRetryCount: 1,
        shouldRetryOnError: true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FavoriteProvider>
            {children}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              transition={Slide}
              pauseOnHover
              theme="dark"
            />
          </FavoriteProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SWRConfig>
  );
};

export default AppProviders;
