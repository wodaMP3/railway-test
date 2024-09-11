import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RailMap from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RailMap />
  </StrictMode>,
)
