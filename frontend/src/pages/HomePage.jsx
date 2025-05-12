import React from 'react';

export default function HomePage() {
    return (
        // TESTOWA ZAWARTOSC DO ZMIANY
        <div className="bg-[#121212] w-full h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl text-[#E0E0E0] mb-4">Welcome to the Home Page</h1>
            <p className="text-[#E0E0E0] mb-8">This is a simple home page.</p>
            <a href="#signup" className="bg-[#FF5555] hover:bg-[#30E9EE] transition-colors duration-200 text-[#E0E0E0] py-3 px-6 rounded-md tracking-wide">ZAPISZ SIĘ</a>
        </div>
    )
}