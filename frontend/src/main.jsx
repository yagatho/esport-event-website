import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './styles/index.css'
import Layout from './components/Layout.jsx'
import AboutPage from './pages/AboutPage.jsx'
import HomePage from './pages/HomePage.jsx'
import GamesPage from './pages/GamesPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><HomePage/></Layout>}/>
                <Route path="/about" element={<Layout><AboutPage/></Layout>}/>
                <Route path="/games" element={<Layout><GamesPage/></Layout>}/>
                <Route path="/faq" element={<Layout><FAQPage/></Layout>}/>
                <Route path="/contact" element={<Layout><ContactPage/></Layout>}/>
                <Route path="/register" element={<Layout><RegisterPage/></Layout>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
