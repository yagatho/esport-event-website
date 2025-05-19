import React from 'react';

export default function HomePage() {
  return (
    <div className="bg-[#121212] min-h-screen w-full px-6 py-10 md:p-10">
      <h1 className="text-4xl md:text-8xl text-[#ecf0f1] mb-10 font-extrabold max-w-7xl">
        Kontakt
      </h1>

      <p className="text-[#95a5a6] text-xl md:text-2xl font-light mb-10 max-w-4xl">
        Masz pytania dotyczące wydarzenia, partnerstwa lub uczestnictwa? Skontaktuj się z nami za pomocą formularza poniżej.
      </p>

      <form
        action="https://formsubmit.co/your@email.com"  // <--- zamień na swój mail lub endpoint
        method="POST"
        className="space-y-6 max-w-3xl"
      >
        <div>
          <label className="block text-[#ecf0f1] text-lg mb-1">Imię i nazwisko</label>
          <input
            type="text"
            name="name"
            required
            className="w-full p-3 rounded-md bg-[#1e1e1e] text-[#ecf0f1] focus:outline-none focus:ring-2 focus:ring-[#c0392b]"
          />
        </div>

        <div>
          <label className="block text-[#ecf0f1] text-lg mb-1">Adres e-mail</label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-3 rounded-md bg-[#1e1e1e] text-[#ecf0f1] focus:outline-none focus:ring-2 focus:ring-[#c0392b]"
          />
        </div>

        <div>
          <label className="block text-[#ecf0f1] text-lg mb-1">Wiadomość</label>
          <textarea
            name="message"
            rows="6"
            required
            className="w-full p-3 rounded-md bg-[#1e1e1e] text-[#ecf0f1] focus:outline-none focus:ring-2 focus:ring-[#c0392b]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#c0392b] hover:bg-[#2980b9] transition-colors duration-200 text-[#E0E0E0] py-3 px-6 rounded-md tracking-wide"
        >
          Wyślij wiadomość
        </button>
      </form>

      {/* Możesz dodać stopkę lub dane kontaktowe */}
      <div className="mt-16 text-[#7f8c8d] text-sm">
        <p>lub napisz bezpośrednio: <a className="text-[#bdc3c7] underline" href="mailto:kontakt@lodzkiegrajace.pl">kontakt@lodzkiegrajace.pl</a></p>
      </div>
    </div>
  );
}

