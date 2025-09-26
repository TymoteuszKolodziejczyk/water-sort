import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import Game from './Game.jsx'

createRoot(document.getElementById('menu')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

createRoot(document.getElementById('game')).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)
