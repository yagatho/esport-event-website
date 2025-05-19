import React from 'react';

export default function HomePage() {
    const games = [
      {
        title: 'League of Legends',
        description: 'Popularna gra MOBA 5v5 — współpracuj z drużyną, by zniszczyć Nexus przeciwnika.',
      },
      {
        title: 'Counter-Strike 2',
        description: 'Taktyczny FPS — podejmuj szybkie decyzje, zabezpieczaj cele i współpracuj z zespołem.',
      },
      {
        title: 'Mortal Kombat 1',
        description: 'Kultowa bijatyka 1v1 — brutalne finishery, legendarni wojownicy i dynamiczne starcia.',
      },
      {
        title: 'Rocket League',
        description: 'Połączenie piłki nożnej i samochodów — rywalizuj w emocjonujących meczach 3v3.',
      },
      {
        title: 'Fortnite',
        description: 'Battle Royale z budowaniem — zbieraj materiały, walcz i zostań ostatnim na placu boju.',
      },
    ];

  return (
    <div className="bg-[#181818] min-h-screen w-full px-6 py-10 md:p-10">
      <h1 className="text-4xl md:text-8xl text-[#ecf0f1] mb-10 font-extrabold max-w-7xl">
        ROZGRYWANE GRY
      </h1>

      <div className="space-y-10">
        {games.map((game, index) => (
          <div key={index} className="bg-[#1e1e1e] p-6 rounded-md shadow-md hover:bg-[#2c2c2c] transition-colors duration-200">
            <h2 className="text-2xl md:text-3xl text-[#ecf0f1] font-bold mb-2">{game.title}</h2>
            <p className="text-[#95a5a6] text-md md:text-xl font-light tracking-wide">{game.description}</p>
          </div>
        ))}
      </div>

      <a
        href="/register"
        className="mt-16 inline-block bg-[#c0392b] hover:bg-[#2980b9] transition-colors duration-200 text-[#E0E0E0] py-3 px-6 rounded-md tracking-wide"
      >
        Zgłoś swoją drużynę
      </a>
    </div>
  );
}

