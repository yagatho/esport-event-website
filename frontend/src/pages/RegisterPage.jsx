import React, { useState } from 'react';

export default function RegisterPage() {
    const [selectedGame, setSelectedGame] = useState('');
    const [formData, setFormData] = useState({});

    const handleGameChange = (e) => {
        setSelectedGame(e.target.value);
    };

    // Handle input changes for basic fields
    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Budujemy obiekt JSON do wysłania
        let teamName = '';
        let members = [];

        switch (selectedGame) {
            case '1':
                teamName = formData['cs-team'] || '';
                members = [
                    formData['cs-member-1'],
                    formData['cs-member-2'],
                    formData['cs-member-3'],
                    formData['cs-member-4'],
                    formData['cs-member-5'],
                ];
                break;
            case '2':
                teamName = formData['lol-team'] || '';
                members = [
                    formData['lol-member-1'],
                    formData['lol-member-2'],
                    formData['lol-member-3'],
                    formData['lol-member-4'],
                    formData['lol-member-5'],
                ];
                break;
            case '3':
                teamName = formData['rl-team'] || '';
                members = [
                    formData['rl-member-1'],
                    formData['rl-member-2'],
                    formData['rl-member-3'],
                ];
                break;
            case '4':
                teamName = formData['ft-team'] || '';
                members = [
                    formData['ft-member-1'],
                    formData['ft-member-2'],
                    formData['ft-member-3'],
                ];
                break;
            case '5':
                teamName = formData['mk-nickname'] || '';
                members = [];
                break;
            default:
                break;
        }

        const payload = {
            teamName,
            gameId: selectedGame,
            leaderName: formData['name'],
            leaderEmail: formData['email'],
            leaderPhone: formData['phone'],
            members,
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert('Błąd: ' + (errorData.error || errorData.message || 'Nieznany błąd'));
            } else {
                alert('Rejestracja przebiegła pomyślnie!');
            }
        } catch (error) {
            alert('Błąd sieci: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}
              className="w-full max-w-4xl mx-auto p-6 bg-[#232323] rounded-none md:rounded-lg shadow-lg mt-8 mb-8 md:border-[#2A2A2A] md:border-2 border-t-2 border-t-[#2A2A2A] border-b-2 border-b-[#2A2A2A]">
            <h2 className="text-4xl font-bold text-[#E0E0E0] mb-6 text-center">Zapisz się na jeden z naszych turniejów
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
                            value={formData['name'] || ''}
                            onChange={handleInputChange}
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
                            value={formData['email'] || ''}
                            onChange={handleInputChange}
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
                            value={formData['phone'] || ''}
                            onChange={handleInputChange}
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
                            <option value="1">Counter-Strike 2</option>
                            <option value="2">League of Legends</option>
                            <option value="3">Rocket League [3v3]</option>
                            <option value="4">Fortnite [3-osobowe składy]</option>
                            <option value="5">Mortal Kombat I</option>
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
                    {selectedGame === '1' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="team" className="block text-[#E0E0E0] mb-2">Nazwa drużyny</label>
                                <input
                                    type="text"
                                    id="cs-team"
                                    name="cs-team"
                                    value={formData['cs-team'] || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#E0E0E0] mb-2">Nickname'y członków zespołu</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        id="cs-member-1"
                                        name="cs-member-1"
                                        placeholder="Nickname członka 1"
                                        value={formData['cs-member-1'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="cs-member-2"
                                        name="cs-member-2"
                                        placeholder="Nickname członka 2"
                                        value={formData['cs-member-2'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="cs-member-3"
                                        name="cs-member-3"
                                        placeholder="Nickname członka 3"
                                        value={formData['cs-member-3'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="cs-member-4"
                                        name="cs-member-4"
                                        placeholder="Nickname członka 4"
                                        value={formData['cs-member-4'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="cs-member-5"
                                        name="cs-member-5"
                                        placeholder="Nickname członka 5"
                                        value={formData['cs-member-5'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* League of Legends specific fields */}
                    {selectedGame === '2' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="lol-team" className="block text-[#E0E0E0] mb-2">Nazwa drużyny</label>
                                <input
                                    type="text"
                                    id="lol-team"
                                    name="lol-team"
                                    value={formData['lol-team'] || ''}
                                    onChange={handleInputChange}
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
                                        placeholder="Nickname członka 1"
                                        value={formData['lol-member-1'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="lol-member-2"
                                        name="lol-member-2"
                                        placeholder="Nickname członka 2"
                                        value={formData['lol-member-2'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="lol-member-3"
                                        name="lol-member-3"
                                        placeholder="Nickname członka 3"
                                        value={formData['lol-member-3'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="lol-member-4"
                                        name="lol-member-4"
                                        placeholder="Nickname członka 4"
                                        value={formData['lol-member-4'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="lol-member-5"
                                        name="lol-member-5"
                                        placeholder="Nickname członka 5"
                                        value={formData['lol-member-5'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Rocket League specific fields */}
                    {selectedGame === '3' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="rl-team" className="block text-[#E0E0E0] mb-2">Nazwa drużyny</label>
                                <input
                                    type="text"
                                    id="rl-team"
                                    name="rl-team"
                                    value={formData['rl-team'] || ''}
                                    onChange={handleInputChange}
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
                                        value={formData['rl-member-1'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="rl-member-2"
                                        name="rl-member-2"
                                        placeholder="Nickname członka 2"
                                        value={formData['rl-member-2'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="rl-member-3"
                                        name="rl-member-3"
                                        placeholder="Nickname członka 3"
                                        value={formData['rl-member-3'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Fortnite specific fields */}
                    {selectedGame === '4' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="ft-team" className="block text-[#E0E0E0] mb-2">Nazwa drużyny</label>
                                <input
                                    type="text"
                                    id="ft-team"
                                    name="ft-team"
                                    value={formData['ft-team'] || ''}
                                    onChange={handleInputChange}
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
                                        value={formData['ft-member-1'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="ft-member-2"
                                        name="ft-member-2"
                                        placeholder="Nickname członka 2"
                                        value={formData['ft-member-2'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        id="ft-member-3"
                                        name="ft-member-3"
                                        placeholder="Nickname członka 3"
                                        value={formData['ft-member-3'] || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Mortal Kombat specific fields */}
                    {selectedGame === '5' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="mk-nickname" className="block text-[#E0E0E0] mb-2">Nickname</label>
                                <input
                                    type="text"
                                    id="mk-nickname"
                                    name="mk-nickname"
                                    value={formData['mk-nickname'] || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#E0E0E0] focus:outline-none focus:border-[#30E9EE]"
                                    required
                                />
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
