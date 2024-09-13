import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from './toastContainer';
import { AuthProvider } from './context/authContext';
import Navbar from './navbar/Navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
