import React, { useState } from 'react';

export default function RegisterPage() {
    const [selectedGame, setSelectedGame] = useState('');
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');

    const handleGameChange = (e) => {
        setSelectedGame(e.target.value);
        // Clear game-specific data when changing games
        const newFormData = { ...formData };
        Object.keys(newFormData).forEach(key => {
            if (key.includes('-')) {
                delete newFormData[key];
            }
        });
        setFormData(newFormData);
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    };

    // Validation function to check if all required fields are filled
    const isFormValid = () => {
        // Basic fields validation
        const hasBasicFields = formData.name &&
            formData.email &&
            formData.phone &&
            selectedGame &&
            formData.terms;

        if (!hasBasicFields) return false;

        // Game-specific validation
        switch (selectedGame) {
            case '1': // Counter-Strike 2
                return formData['cs-team'] &&
                    formData['cs-member-1'] &&
                    formData['cs-member-2'] &&
                    formData['cs-member-3'] &&
                    formData['cs-member-4'] &&
                    formData['cs-member-5'];
            case '2': // League of Legends
                return formData['lol-team'] &&
                    formData['lol-member-1'] &&
                    formData['lol-member-2'] &&
                    formData['lol-member-3'] &&
                    formData['lol-member-4'] &&
                    formData['lol-member-5'];
            case '3': // Rocket League
                return formData['rl-team'] &&
                    formData['rl-member-1'] &&
                    formData['rl-member-2'] &&
                    formData['rl-member-3'];
            case '4': // Fortnite
                return formData['ft-team'] &&
                    formData['ft-member-1'] &&
                    formData['ft-member-2'] &&
                    formData['ft-member-3'];
            case '5': // Mortal Kombat
                return formData['mk-nickname'];
            default:
                return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        try {
            // JSON building for the API
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
                    ].filter(Boolean);
                    break;
                case '2':
                    teamName = formData['lol-team'] || '';
                    members = [
                        formData['lol-member-1'],
                        formData['lol-member-2'],
                        formData['lol-member-3'],
                        formData['lol-member-4'],
                        formData['lol-member-5'],
                    ].filter(Boolean);
                    break;
                case '3':
                    teamName = formData['rl-team'] || '';
                    members = [
                        formData['rl-member-1'],
                        formData['rl-member-2'],
                        formData['rl-member-3'],
                    ].filter(Boolean);
                    break;
                case '4':
                    teamName = formData['ft-team'] || '';
                    members = [
                        formData['ft-member-1'],
                        formData['ft-member-2'],
                        formData['ft-member-3'],
                    ].filter(Boolean);
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
                gameId: parseInt(selectedGame),
                leaderName: formData['name'],
                leaderEmail: formData['email'],
                leaderPhone: formData['phone'],
                members,
            };

            console.log('Sending registration data:', payload);

            // Send registration data to the server
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Wystąpił błąd podczas rejestracji');
            }

            console.log('Registration successful:', result);
            setSubmitStatus('success');

            // Reset form after successful submission
            setFormData({});
            setSelectedGame('');

        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error.message);
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getGameName = (gameId) => {
        const games = {
            '1': 'Counter-Strike 2',
            '2': 'League of Legends',
            '3': 'Rocket League',
            '4': 'Fortnite',
            '5': 'Mortal Kombat I'
        };
        return games[gameId] || '';
    };

    const getTeamSize = (gameId) => {
        const teamSizes = {
            '1': 5,
            '2': 5,
            '3': 3,
            '4': 3,
            '5': 1
        };
        return teamSizes[gameId] || 0;
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-[#232323] rounded-none md:rounded-lg shadow-2xl mt-8 mb-8 md:border-[#2A2A2A] md:border-2 border-t-2 border-t-[#2A2A2A] border-b-2 border-b-[#2A2A2A]">
            <h2 className="text-4xl font-bold text-[#E0E0E0] mb-4 text-center">REJESTRACJA NA TURNIEJ</h2>
            <p className="text-[#95a5a6] text-lg md:text-xl font-light mb-8 text-center max-w-3xl mx-auto">
                Zapisz się na jeden z naszych turniejów już dziś! Wypełnij formularz poniżej i dołącz do rywalizacji.
            </p>

            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-800/30 border border-green-600 rounded-lg text-green-200 flex items-center gap-3">
                    <div>
                        <strong>Rejestracja przebiegła pomyślnie!</strong>
                    </div>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-800/30 border border-red-600 rounded-lg text-red-200 flex items-center gap-3">
                    <div>
                        <strong>Wystąpił błąd podczas rejestracji</strong>
                        <p className="text-sm mt-1">Spróbuj ponownie lub skontaktuj się z organizatorami.</p>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row lg:gap-8 h-full">
                {/* Basic information */}
                <div className="lg:w-1/2 mb-8 lg:mb-0 flex flex-col flex-1">
                    <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A] flex flex-col flex-1">
                        <h3 className="text-2xl font-bold text-[#E0E0E0] mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#FF5555] rounded-lg flex items-center justify-center text-white font-bold">1</div>
                            Dane podstawowe
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-[#E0E0E0] mb-2 font-medium">
                                    Imię i nazwisko lidera <span className="text-[#FF5555]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData['name'] || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                                    placeholder="Wpisz swoje imię i nazwisko"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[#E0E0E0] mb-2 font-medium">
                                    Email <span className="text-[#FF5555]">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData['email'] || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                                    placeholder="twoj@email.com"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-[#E0E0E0] mb-2 font-medium">
                                    Numer telefonu <span className="text-[#FF5555]">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData['phone'] || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                                    placeholder="123 456 789"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="game" className="block text-[#E0E0E0] mb-2 font-medium">
                                    Wybierz grę <span className="text-[#FF5555]">*</span>
                                </label>
                                <select
                                    id="game"
                                    name="game"
                                    className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                                    required
                                    value={selectedGame}
                                    onChange={handleGameChange}
                                    disabled={isSubmitting}
                                >
                                    <option value="">Wybierz grę</option>
                                    <option value="1">Counter-Strike 2 (5v5)</option>
                                    <option value="2">League of Legends (5v5)</option>
                                    <option value="3">Rocket League (3v3)</option>
                                    <option value="4">Fortnite (3-osobowe składy)</option>
                                    <option value="5">Mortal Kombat I (1v1)</option>
                                </select>
                            </div>

                            <div className="border-t border-[#2A2A2A] pt-6">
                                <label className="flex items-start text-[#E0E0E0] cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        checked={formData.terms || false}
                                        onChange={handleCheckboxChange}
                                        className="mt-1 mr-3 w-4 h-4 text-[#30E9EE] bg-[#1E1E1E] border-[#2A2A2A] rounded focus:ring-[#30E9EE] focus:ring-2"
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <span className="text-sm group-hover:text-[#30E9EE] transition-colors">
                                        Akceptuję <span className="text-[#30E9EE] underline">regulamin</span> i wyrażam zgodę na przetwarzanie danych osobowych <span className="text-[#FF5555]">*</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extended information */}
                <div className="lg:w-1/2 flex flex-col flex-1">
                    <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A] flex flex-col flex-1">
                        <h3 className="text-2xl font-bold text-[#E0E0E0] mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#30E9EE] rounded-lg flex items-center justify-center text-black font-bold">2</div>
                            Dane drużyny
                        </h3>

                        {!selectedGame && (
                            <div className="h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-[#A0A0A0] text-lg">Wybierz grę, aby wyświetlić pola drużyny</p>
                                    <p className="text-[#666] text-sm mt-2">Każda gra ma różne wymagania dotyczące składu</p>
                                </div>
                            </div>
                        )}

                        {selectedGame && (
                            <div className="space-y-6">
                                <div className="bg-[#2A2A2A]/30 rounded-lg p-4 border border-[#30E9EE]/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3 h-3 bg-[#30E9EE] rounded-full"></div>
                                        <span className="text-[#30E9EE] font-semibold">{getGameName(selectedGame)}</span>
                                    </div>
                                    <p className="text-[#A0A0A0] text-sm">
                                        {getTeamSize(selectedGame) === 1
                                            ? 'Turniej indywidualny - wystarczy podać swój nickname'
                                            : `Drużyna ${getTeamSize(selectedGame)}-osobowa - wprowadź dane wszystkich członków`
                                        }
                                    </p>
                                </div>

                                {/* Mortal Kombat - individual */}
                                {selectedGame === '5' && (
                                    <div>
                                        <label htmlFor="mk-nickname" className="block text-[#E0E0E0] mb-2 font-medium">
                                            Twój nickname <span className="text-[#FF5555]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="mk-nickname"
                                            name="mk-nickname"
                                            value={formData['mk-nickname'] || ''}
                                            onChange={handleInputChange}
                                            className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#30E9EE] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                                            placeholder="Wpisz swój nickname w grze"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                )}

                                {/* Team games */}
                                {['1', '2', '3', '4'].includes(selectedGame) && (
                                    <>
                                        <div>
                                            <label className="block text-[#E0E0E0] mb-2 font-medium">
                                                Nazwa drużyny <span className="text-[#FF5555]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name={`${selectedGame === '1' ? 'cs' : selectedGame === '2' ? 'lol' : selectedGame === '3' ? 'rl' : 'ft'}-team`}
                                                value={formData[`${selectedGame === '1' ? 'cs' : selectedGame === '2' ? 'lol' : selectedGame === '3' ? 'rl' : 'ft'}-team`] || ''}
                                                onChange={handleInputChange}
                                                className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#30E9EE] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                                                placeholder="Wpisz nazwę swojej drużyny"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[#E0E0E0] mb-3 font-medium">
                                                Nickname'y członków zespołu <span className="text-[#FF5555]">*</span>
                                            </label>
                                            <div className="space-y-3">
                                                {Array.from({ length: getTeamSize(selectedGame) }, (_, i) => (
                                                    <div key={i} className="relative">
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#30E9EE] rounded-full flex items-center justify-center text-black text-xs font-bold">
                                                            {i + 1}
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name={`${selectedGame === '1' ? 'cs' : selectedGame === '2' ? 'lol' : selectedGame === '3' ? 'rl' : 'ft'}-member-${i + 1}`}
                                                            placeholder={`Nickname członka ${i + 1}`}
                                                            value={formData[`${selectedGame === '1' ? 'cs' : selectedGame === '2' ? 'lol' : selectedGame === '3' ? 'rl' : 'ft'}-member-${i + 1}`] || ''}
                                                            onChange={handleInputChange}
                                                            className="w-full pl-12 pr-4 py-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#30E9EE] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                                                            required
                                                            disabled={isSubmitting}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit button */}
            <div className="mt-8 pt-6 border-t border-[#2A2A2A] flex flex-col items-center">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValid()}
                    className="bg-[#c0392b] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#e74c3c] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-[#c0392b] flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            REJESTROWANIE...
                        </>
                    ) : (
                        <>
                            <span>ZAREJESTRUJ SIĘ NA TURNIEJ</span>
                        </>
                    )}
                </button>

                {!isFormValid() && selectedGame && (
                    <p className="text-[#FF5555] text-sm text-center mt-3">
                        Wypełnij wszystkie wymagane pola aby się zarejestrować
                    </p>
                )}

                {!selectedGame && (
                    <p className="text-[#666] text-sm text-center mt-3">
                        Wybierz grę, aby móc się zarejestrować
                    </p>
                )}
            </div>

            <div className="mt-6 text-center">
                <p className="text-[#95a5a6] text-sm">
                    Masz pytania? <span className="text-[#30E9EE] underline cursor-pointer hover:text-[#FF5555] transition-colors">Skontaktuj się z nami</span>
                </p>
            </div>
        </div>
    );
}