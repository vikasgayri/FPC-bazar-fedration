import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App'
import { AuthProvider } from '@/context/AuthContext'
import { EnquiryListProvider } from '@/context/EnquiryListContext'
import { ToastProvider } from '@/context/ToastContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <EnquiryListProvider>
          <App />
        </EnquiryListProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
)
