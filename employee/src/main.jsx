import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./Context/AuthContext.jsx"
import { NotesProvider } from './Context/LogContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <NotesProvider>
      <App/>
      </NotesProvider>
    </AuthProvider>
  
  </StrictMode>,
)
