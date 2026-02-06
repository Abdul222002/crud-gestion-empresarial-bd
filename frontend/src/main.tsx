import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner'
import AppBasicoReact19 from './apps/AppBasicoReact19.tsx'

const App = AppBasicoReact19

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position='top-right' richColors />
    <App />
  </StrictMode>,
)
