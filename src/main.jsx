import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* BASE_URL is /shop-demo/ on GitHub Pages, / locally */}
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <App />
        </BrowserRouter>
    </StrictMode>
)
