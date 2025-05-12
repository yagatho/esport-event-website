import React, {useState, useEffect, useRef} from 'react';
import Logo from '../assets/logo.png';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    // Close menu when clicking outside or on hamburger
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle menu open/close
    useEffect(() => {
        if (open) {
            setVisible(true);
            setIsClosing(false);
        } else if (visible) {
            setIsClosing(true);
            const timeout = setTimeout(() => {
                setVisible(false);
                setIsClosing(false);
            }, 250);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    return (<nav
        className="bg-[#1E1E1E] w-full h-20 flex items-center justify-between px-6 md:px-22 border-b-2 border-b-[#2A2A2A] relative">
        <div className="flex items-center justify-between w-full">
            <a href="/">
                <img src={Logo} alt="Logo" className="h-20"/>
            </a>

            {/* Desktop menu */}
            <div className="hidden md:flex">
                <a href="/about" className="px-9 py-3 text-[#E0E0E0] hover:text-[#30E9EE] hover:underline underline-offset-4 transition-all duration-200">O nas</a>
                <a href="/games" className="px-9 py-3 border-l-2 border-[#2A2A2A] text-[#E0E0E0] hover:text-[#30E9EE] hover:underline underline-offset-4 transition-all duration-200">Gry</a>
                <a href="/faq" className="px-9 py-3 border-l-2 border-[#2A2A2A] text-[#E0E0E0] hover:text-[#30E9EE] hover:underline underline-offset-4 transition-all duration-200">FAQ</a>
                <a href="/contact" className="px-9 py-3 border-l-2 border-r-2 border-[#2A2A2A] text-[#E0E0E0] hover:text-[#30E9EE] hover:underline underline-offset-4 transition-colors duration-200">Kontakt</a>
                <a href="/register" className="ml-7 bg-[#FF5555] hover:bg-[#30E9EE] transition-colors duration-200 text-[#E0E0E0] py-3 px-6 rounded-md tracking-wide">ZAPISZ SIĘ</a>
            </div>

            {/* Hamburger */}
            <button
                ref={hamburgerRef}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10"
                onClick={() => setOpen(open => !open)}
                aria-label="Otwórz menu"
            >
                <span className={`block w-6 h-0.5 bg-[#E0E0E0] mb-1 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}/>
                <span className={`block w-6 h-0.5 bg-[#E0E0E0] mb-1 transition-all ${open ? 'opacity-0' : ''}`}/>
                <span className={`block w-6 h-0.5 bg-[#E0E0E0] transition-all ${open ? '-rotate-45 -translate-y-1' : ''}`}/>
            </button>

            {/* Dropdown mobile menu */}
            {visible && (<div ref={menuRef} className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[95%] bg-[#232323] rounded shadow-lg flex flex-col items-center md:hidden z-50 divide-y divide-[#2A2A2A] ${isClosing ? 'animate-[slideUp_0.3s_ease-in]' : 'animate-[slideDown_0.3s_ease-out]'}`}>
                <a href="/about" className="w-[80%] px-4 py-3 mt-2 text-[#E0E0E0] text-center" onClick={() => setOpen(false)}>O nas</a>
                <a href="/games" className="w-[80%] px-4 py-3 text-[#E0E0E0] text-center" onClick={() => setOpen(false)}>Gry</a>
                <a href="/faq" className="w-[80%] px-4 py-3 text-[#E0E0E0] text-center" onClick={() => setOpen(false)}>FAQ</a>
                <a href="/contact" className="w-[80%] px-4 py-3 text-[#E0E0E0] text-center" onClick={() => setOpen(false)}>Kontakt</a>
                <a href="/register" className="bg-[#FF5555]  text-[#E0E0E0] py-3 px-6 mb-3 mt-3 rounded-md tracking-wide" onClick={() => setOpen(false)}>ZAPISZ SIĘ</a>
            </div>)}
        </div>
    </nav>);
};