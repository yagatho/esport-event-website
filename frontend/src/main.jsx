import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/index.css'
import Menu from './components/Menu.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Menu/>
        <Footer/>
    </StrictMode>,
)
