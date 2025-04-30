import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./Context/AuthContext.jsx"
import { NotesProvider } from './Context/LogContext.jsx'
import { ProfileProvider } from './Context/ProfileContext.jsx'
import { TaskProvider } from './Context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <ProfileProvider>
          <NotesProvider>
            <App />
          </NotesProvider>
        </ProfileProvider>
      </TaskProvider>
    </AuthProvider>

  </StrictMode>,
)
