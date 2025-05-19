import React from 'react';

export default function HomePage() {
  const faqs = [
    {
      question: 'Kto może wziąć udział w turnieju?',
      answer: 'Udział może wziąć każda osoba mieszkająca w województwie łódzkim, która ukończyła 13 lat (za zgodą opiekuna).',
    },
    {
      question: 'Czy udział jest płatny?',
      answer: 'Nie, udział w turnieju i wydarzeniach towarzyszących jest całkowicie darmowy.',
    },
    {
      question: 'Jak się zapisać?',
      answer: 'Wystarczy kliknąć przycisk "Zapisz się już dziś" i wypełnić formularz na stronie głównej.',
    },
    {
      question: 'Czy muszę mieć własny sprzęt?',
      answer: 'Nie. Na finałach zapewniamy pełne stanowiska z komputerami i peryferiami.',
    },
    {
      question: 'Czy będą nagrody?',
      answer: 'Tak! Przewidziane są nagrody finansowe, sprzęt gamingowy oraz puchary dla zwycięzców.',
    },
  ];

  return (
    <div className="bg-[#121212] min-h-screen w-full px-6 py-10 md:p-10">
      <h1 className="text-4xl md:text-8xl text-[#ecf0f1] mb-10 font-extrabold max-w-7xl">
        FAQ — Najczęściej Zadawane Pytania
      </h1>

      <div className="space-y-8">
        {faqs.map((item, index) => (
          <div key={index} className="bg-[#1e1e1e] p-6 rounded-md shadow-md hover:bg-[#2c2c2c] transition-colors duration-200">
            <h2 className="text-xl md:text-2xl text-[#ecf0f1] font-bold mb-2">{item.question}</h2>
            <p className="text-[#95a5a6] text-md md:text-xl font-light tracking-wide">{item.answer}</p>
          </div>
        ))}
      </div>

      <a
        href="/contact"
        className="mt-16 inline-block bg-[#c0392b] hover:bg-[#2980b9] transition-colors duration-200 text-[#E0E0E0] py-3 px-6 rounded-md tracking-wide"
      >
        Zgłoś swoje pytanie
      </a>
    </div>
  );
}

