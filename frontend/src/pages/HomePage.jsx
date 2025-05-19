import React from 'react';
import orzel from '../assets/orzel.png';
import hypergear from '../assets/hypergear.png';
import temp from '../assets/temp.jpg';
import games from '../assets/games.png';

export default function HomePage() {


  return (
    <div className="bg-[#121212] w-full h-auto scroll-smooth">
      {/* Nawigacja */}
      <nav className="sticky top-0 z-50 bg-[#1e1e1e] text-[#ecf0f1] px-6 py-4 shadow-md hidden md:flex justify-center gap-6 text-lg">
        <a href="#intro" className="hover:text-[#c0392b] transition-colors">Start</a>
        <a href="#about" className="hover:text-[#c0392b] transition-colors">O wydarzeniu</a>
        <a href="#partners" className="hover:text-[#c0392b] transition-colors">Partnerzy</a>
        <a href="#schedule" className="hover:text-[#c0392b] transition-colors">Harmonogram</a>
      </nav>

{/* Sekcja 1 */}
<div
  id="intro"
  className="relative min-h-screen w-full px-6 py-10 md:p-10 text-white flex flex-col justify-center bg-[#121212]"
  style={{
    backgroundImage: `linear-gradient(295deg, rgba(18, 18, 18, 0.4), #121212 65%), url(${temp})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="z-10 max-w-7xl">
    <h1 className="text-4xl md:text-8xl text-[#ecf0f1] mb-6 font-extrabold">
      Łódzkie Grające Regionalne Mistrzostwa Esportowe
    </h1>
    <p className="text-[#95a5a6] text-lg md:text-3xl mb-8 max-w-6xl font-light tracking-wide">
      pierwsze oficjalne Mistrzostwa Esportowe Województwa Łódzkiego, mające na celu wyłonienie najlepszych graczy i zespołów w regionie. Turniej skupia pasjonatów e-sportu, promuje zdrową rywalizację oraz integruje lokalną społeczność gamingową.
    </p>

    {/* Motto */}
    <p className="text-center text-xl md:text-2xl italic text-[#c0392b] mt-12">
      „Graj, rywalizuj, reprezentuj!”
    </p>
  </div>
</div>



      {/* Sekcja 2 */}
      <div
        id="about"
        className="relative min-h-screen w-full px-6 py-10 md:p-10 text-white bg-[#181818] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212 90%), url(${games})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="z-10 max-w-7xl">
          <h1 className="text-4xl md:text-8xl text-[#ecf0f1] mb-6 font-extrabold">
            Czym są “Łódzkie Grające”
          </h1>
          <div className="space-y-12">
            <div>
              <h4 className="text-2xl md:text-3xl text-[#ecf0f1] font-extrabold">
                Wydarzeniem dla fanów każdej gry
              </h4>
              <p className="text-[#95a5a6] text-lg md:text-2xl font-light max-w-6xl tracking-wide">
                Niezależnie od tego, czy grasz w FPS-y, MOBA, czy bijatyki...
              </p>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl text-[#ecf0f1] font-extrabold">
                Nie tylko graniem w gry
              </h4>
              <p className="text-[#95a5a6] text-lg md:text-2xl font-light max-w-6xl tracking-wide">
                Organizujemy także panele dyskusyjne, spotkania z twórcami...
              </p>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl text-[#ecf0f1] font-extrabold">
                Nagrodami i niezapomnianymi emocjami
              </h4>
              <p className="text-[#95a5a6] text-lg md:text-2xl font-light max-w-6xl tracking-wide">
                Wielki finał z nagrodami, transmisjami na żywo...
              </p>
            </div>
          </div>
          <a
            href="/faq"
            className="bg-[#c0392b] hover:bg-[#2980b9] transition-colors duration-200 text-[#E0E0E0] py-3 px-6 rounded-md tracking-wide inline-block mt-10"
          >
            Najczęściej zadawane pytania
          </a>
        </div>
      </div>




{/* Sekcja 3 */}
<div id="partners" className="bg-[#121212] min-h-screen w-full px-6 py-10 md:p-10">
  <h1 className="text-4xl md:text-8xl text-[#ecf0f1] mb-16 font-extrabold text-center">
    PARTNERZY
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
    {/* Partner 1: Orzeł Power */}
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 max-w-md">
      <img
        src={orzel}
        alt="Orzeł Power"
        className="w-40 h-40 md:w-60 md:h-60 object-contain mb-6"
      />
      <h4 className="text-2xl md:text-3xl text-[#ecf0f1] font-extrabold mb-2">
        Orzeł Power
      </h4>
      <p className="text-[#95a5a6] text-center text-lg md:text-xl font-light max-w-sm tracking-wide mb-4">
        Polska marka napojów energetycznych wspierająca graczy i widzów podczas najważniejszych rozgrywek.
      </p>
      <ul className="text-[#E0E0E0] space-y-2 mb-4">
        <li>✅ Strefa Orła Power – darmowe próbki napojów dla graczy i publiczności.</li>
        <li>✅ Power Break – przerwy z konkursami i nagrodami od sponsora.</li>
        <li>✅ Branding w strefie rozgrywek – opakowania napojów widoczne na streamie i scenie.</li>
      </ul>
      <p className="italic text-[#c0392b] text-center">„Orzeł Power – energia dla zwycięzców!”</p>
    </div>

    {/* Partner 2: HyperGear */}
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 max-w-md">
      <img
        src={hypergear}
        alt="HyperGear"
        className="w-40 h-40 md:w-60 md:h-60 object-contain mb-6"
      />
      <h4 className="text-2xl md:text-3xl text-[#ecf0f1] font-extrabold mb-2">
        HyperGear
      </h4>
      <p className="text-[#95a5a6] text-center text-lg md:text-xl font-light max-w-sm tracking-wide mb-4">
        Nowoczesny producent sprzętu gamingowego z innowacyjnymi rozwiązaniami dla graczy.
      </p>
      <ul className="text-[#E0E0E0] space-y-2 mb-4">
        <li>✅ Strefa testowania sprzętu – gracze mogą przetestować nowości</li>
        <li>✅ Nagrody w konkursach (np. "MVP turnieju" dostaje myszkę gamingową)</li>
        <li>✅ HYPERGEAR Lab – krótkie warsztaty o doborze sprzętu dla graczy</li>
        <li>✅ Branding na scenie (logotyp na streamie, podkładki pod myszki z logo)</li>
      </ul>
      <p className="italic text-[#c0392b] text-center">"Graj z mocą profesjonalnego sprzętu!"</p>
    </div>
  </div>

  <div className="flex justify-center mt-12">
    <a
      href="/contact"
      className="bg-[#c0392b] hover:bg-[#2980b9] transition-colors duration-200 text-[#E0E0E0] py-3 px-6 rounded-md tracking-wide inline-block"
    >
      Zostań Partnerem
    </a>
  </div>
</div>


      {/* Sekcja 4 */}
<div id="schedule" className="bg-[#181818] min-h-screen w-full px-6 py-10 md:p-10">
  <h1 className="text-4xl md:text-8xl text-[#ecf0f1] mb-16 font-extrabold text-center">
    HARMONOGRAM
  </h1>

  <div className="relative border-l-4 border-[#c0392b] pl-6 ml-2 space-y-12 max-w-4xl mx-auto">
    {/* Etap 1 */}
    <div className="group">
      <div className="absolute -left-3 w-6 h-6 bg-[#c0392b] rounded-full border-4 border-[#181818] group-hover:scale-125 transition-transform duration-200" />
      <h3 className="text-[#ecf0f1] text-2xl md:text-3xl font-bold">Kwalifikacje online</h3>
      <p className="text-[#95a5a6] text-lg md:text-2xl font-light">
        01.07 - 10.07
      </p>
    </div>

    {/* Etap 2 */}
    <div className="group">
      <div className="absolute -left-3 w-6 h-6 bg-[#c0392b] rounded-full border-4 border-[#181818] group-hover:scale-125 transition-transform duration-200" />
      <h3 className="text-[#ecf0f1] text-2xl md:text-3xl font-bold">Półfinały stacjonarne</h3>
      <p className="text-[#95a5a6] text-lg md:text-2xl font-light">
        15.07 - 17.07
      </p>
    </div>

    {/* Etap 3 */}
    <div className="group">
      <div className="absolute -left-3 w-6 h-6 bg-[#c0392b] rounded-full border-4 border-[#181818] group-hover:scale-125 transition-transform duration-200" />
      <h3 className="text-[#ecf0f1] text-2xl md:text-3xl font-bold">Wielki Finał</h3>
      <p className="text-[#95a5a6] text-lg md:text-2xl font-light">
        20.07 – z transmisją na żywo
      </p>
    </div>
  </div>

  <div className="flex justify-center mt-16">
    <a
      id="signup"
      href="/register"
      className="bg-[#c0392b] hover:bg-[#2980b9] transition-colors duration-200 text-[#E0E0E0] py-3 px-6 rounded-md tracking-wide inline-block"
    >
      ZAPISZ SIĘ JUŻ DZIŚ
    </a>
  </div>
</div>
    </div>
  );
}

