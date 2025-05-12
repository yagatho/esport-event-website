import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-[#1E1E1E] w-full py-6 flex flex-col items-center justify-center text-center text-[#A0A0A0] space-y-2 border-t-2 border-t-[#2A2A2A] relative">
            <h1 className="font-bold">ŁÓDZKIE GRAJĄCE ©</h1>
            <h2>Projekt na "Projektowanie interfejsów aplikacji www"</h2>
            <h3 className="mt-2">Twórcy:</h3>
            <div className="flex gap-4">
                <a href={"https://github.com/yagatho"} className="hover:text-[#30E9EE] transition-colors">Szymon Grucela</a>
                <a href={"https://github.com/wrzepka"} className="hover:text-[#30E9EE] transition-colors">Wiktor Rzepka</a>
            </div>
        </footer>
    )
}