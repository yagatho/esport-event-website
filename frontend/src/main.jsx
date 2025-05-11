import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/index.css'
import Menu from './components/Menu.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Menu/>
    </StrictMode>,
)
