import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import App from './App.tsx'
import theme from './theme.ts'
import './index.css'

const rootElement = document.getElementById('root')!

const app = (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}