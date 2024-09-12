import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
       </AuthProvider>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>,
)
