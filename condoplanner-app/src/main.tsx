import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './routes/AppRouter'
import Alert from './components/Alert'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Alert />
    <AppRouter />
  </StrictMode>,
)
