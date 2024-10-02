import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import '@/app/globals.css';

import { ToastContainer } from '@/app/toastContainer';
import { AuthProvider } from '@/app/context/authContext';
import StoreProvider from '@/app/StoreProvider';
import Navbar from '@/app/navbar/Navbar'
import GoogleAuthprovider from "@/app/GoogleAuthprovider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{background: 'linear-gradient(135deg, rgba(7, 18, 31, 1) 0%, rgba(0, 0, 0, 0.8) 100%)', minHeight: '100vh'}}>
      <GoogleAuthprovider>
        <AuthProvider>
          <StoreProvider>
            <Navbar />
            {children}
          </StoreProvider>
        </AuthProvider>
      </GoogleAuthprovider>
        <ToastContainer />
      </body>
    </html>
  );
}
