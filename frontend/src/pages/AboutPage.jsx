
import React from 'react';
import team1 from '../assets/team1.jpg';
import team2 from '../assets/team2.jpg';

export default function HomePage() {
  const team = [
    {
      name: 'Szymon Grucela',
      role: 'Dev',
      img: team1,
      github: 'https://github.com/yagatho'
    },
    {
      name: 'Wiktor Rzepka',
      role: 'Dev',
      img: team2,
      github: 'https://github.com/wrzepka'
    }
  ];

  return (
    <div className="bg-[#121212] min-h-screen w-full px-6 py-10 md:p-10 text-[#ecf0f1]">
      {/* Nagłówek */}
      <h1 className="text-4xl md:text-8xl font-extrabold mb-8 text-center">
        O NAS
      </h1>

      {/* Sekcja Misja */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Nasza misja</h2>
        <p className="text-lg md:text-xl font-light tracking-wide">
          Chcemy zjednoczyć lokalną społeczność graczy poprzez emocjonujące turnieje
          i wydarzenia towarzyszące. Stawiamy na fair play, rozwój talentów i dobrą zabawę!
        </p>
      </section>

      {/* Sekcja Wizja */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Nasza wizja</h2>
        <p className="text-lg md:text-xl font-light tracking-wide">
          Marzymy o tym, aby Łódzkie Grające było rozpoznawalne w całej Polsce,
          a nasi uczestnicy czuli się jak na profesjonalnych zawodach e-sportowych.
        </p>
      </section>

      {/* Sekcja Zespół */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">Poznaj nasz zespół</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {team.map((member, idx) => (
            <div
              key={idx}
              onClick={() => window.open(member.github, '_blank')}
              className="bg-[#1e1e1e] rounded-xl shadow-lg p-6 flex flex-col items-center
                         transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-1">{member.name}</h3>
              <p className="text-[#95a5a6] text-center font-light mb-2">{member.role}</p>
              <span className="text-sm text-[#2980b9] underline">GitHub →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

