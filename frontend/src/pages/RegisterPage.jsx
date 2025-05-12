import React, {useState} from 'react';

export default function RegisterPage() {
    const [selectedGame, setSelectedGame] = useState('');

    // Game change handler
    const handleGameChange = (e) => {
        setSelectedGame(e.target.value);
    };

    return (
        <form action="/api/register" method="POST"
              className="w-full max-w-4xl mx-auto p-6 bg-[#232323] rounded-none md:rounded-lg shadow-lg mt-8 mb-8 md:border-[#2A2A2A] md:border-2">
            <h2 className="text-2xl font-bold text-[#E0E0E0] mb-6 text-center">Zapisz się na jeden z naszych turniejów
                już dziś!</h2>

            <div className="flex flex-col md:flex-row md:space-x-6">
                {/* Basic information */}
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold text-[#E0E0E0] mb-4">Dane podstawowe [lidera]</h3>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-[#E0E0E0] mb-2">Imię i nazwisko</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-[#E0E0E0] mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-[#E0E0E0] mb-2">Numer telefonu</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="game" className="block text-[#E0E0E0] mb-2">Wybierz grę</label>
                        <select
                            id="game"
                            name="game"
                            className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                            required
                            value={selectedGame}
                            onChange={handleGameChange}
                        >
                            <option value="">Wybierz grę</option>
                            <option value="game-cs2">Counter-Strike 2</option>
                            <option value="game-lol">League of Legends</option>
                            <option value="game-rl">Rocket League [3v3]</option>
                            <option value="game-ft">Fortnite [3-osobowe składy]</option>
                            <option value="game-mk1">Mortal Kombat I</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="flex items-start text-[#E0E0E0]">
                            <input
                                type="checkbox"
                                name="terms"
                                className="mt-1 mr-2"
                                required
                            />
                            <span className="text-sm">Akceptuję regulamin i wyrażam zgodę na przetwarzanie danych osobowych</span>
                        </label>
                    </div>
                </div>

                {/* Divider - only for non-mobile */}
                <div className="hidden md:block w-px bg-[#2A2A2A]"></div>

                {/* Extended informations */}
                <div className="md:w-1/2">
                    <h3 className="text-xl font-semibold text-[#E0E0E0] mb-4">Dane szczegółowe</h3>

                    {!selectedGame && (
                        <div className="h-full flex items-center justify-center">
                            <p className="text-[#A0A0A0] text-center">Wybierz grę, aby wyświetlić dodatkowe pola</p>
                        </div>
                    )}

                    {/* CS2 specific fields */}
                    {selectedGame === 'game-cs2' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="team" className="block text-[#E0E0E0] mb-2">Nazwa drużyny</label>
                                <input
                                    type="text"
                                    id="team"
                                    name="team"
                                    className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#E0E0E0] mb-2">Nickname'y członków zespołu</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        id="team-member-1"
                                        name="team-member-1"
                                        placeholder="Nickname członka 1"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="team-member-2"
                                        name="team-member-2"
                                        placeholder="Nickname członka 2"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="team-member-3"
                                        name="team-member-3"
                                        placeholder="Nickname członka 3"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="team-member-4"
                                        name="team-member-4"
                                        placeholder="Nickname członka 4"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="team-member-5"
                                        name="team-member-5"
                                        placeholder="Nickname członka 5"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* League of Legends specific fields */}
                    {selectedGame === 'game-lol' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="lol-team" className="block text-[#E0E0E0] mb-2">Nazwa drużyny</label>
                                <input
                                    type="text"
                                    id="lol-team"
                                    name="lol-team"
                                    className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#E0E0E0] mb-2">Nickname'y członków zespołu</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        id="lol-member-1"
                                        name="lol-member-1"
                                        placeholder="Top"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="lol-member-2"
                                        name="lol-member-2"
                                        placeholder="Jungle"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="lol-member-3"
                                        name="lol-member-3"
                                        placeholder="Mid"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="lol-member-4"
                                        name="lol-member-4"
                                        placeholder="ADC"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="lol-member-5"
                                        name="lol-member-5"
                                        placeholder="Support"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Rocket League specific fields */}
                    {selectedGame === 'game-rl' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="rl-team" className="block text-[#E0E0E0] mb-2">Nazwa drużyny</label>
                                <input
                                    type="text"
                                    id="rl-team"
                                    name="rl-team"
                                    className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#E0E0E0] mb-2">Nickname'y członków zespołu</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        id="rl-member-1"
                                        name="rl-member-1"
                                        placeholder="Nickname członka 1"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="rl-member-2"
                                        name="rl-member-2"
                                        placeholder="Nickname członka 2"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="rl-member-3"
                                        name="rl-member-3"
                                        placeholder="Nickname członka 3"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Fortnite specific fields */}
                    {selectedGame === 'game-ft' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="ft-team" className="block text-[#E0E0E0] mb-2">Nazwa drużyny</label>
                                <input
                                    type="text"
                                    id="ft-team"
                                    name="ft-team"
                                    className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#E0E0E0] mb-2">Nickname'y członków zespołu</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        id="ft-member-1"
                                        name="ft-member-1"
                                        placeholder="Nickname członka 1"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="ft-member-2"
                                        name="ft-member-2"
                                        placeholder="Nickname członka 2"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="ft-member-3"
                                        name="ft-member-3"
                                        placeholder="Nickname członka 3"
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Mortal Kombat specific fields */}
                    {selectedGame === 'game-mk1' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="mk-nickname" className="block text-[#E0E0E0] mb-2">Nickname</label>
                                <input
                                    type="text"
                                    id="mk-nickname"
                                    name="mk-nickname"
                                    className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="mk-character" className="block text-[#E0E0E0] mb-2">Ulubiona
                                    postać</label>
                                <select
                                    id="mk-character"
                                    name="mk-character"
                                    className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                >
                                    <option value="">Wybierz postać</option>
                                    <option value="scorpion">Scorpion</option>
                                    <option value="sub-zero">Sub-Zero</option>
                                    <option value="raiden">Raiden</option>
                                    <option value="kitana">Kitana</option>
                                    <option value="liu-kang">Liu Kang</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Submit button - full width */}
            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full bg-[#FF5555] hover:bg-[#30E9EE] transition-colors duration-200 text-[#E0E0E0] py-3 px-6 rounded-md tracking-wide"
                >
                    ZAREJESTRUJ SIĘ
                </button>
            </div>
        </form>
    );
}