import React, {useState} from 'react';

export default function RegisterPage() {
    const [selectedGame, setSelectedGame] = useState('');
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        name: '',
        email: '',
        phone: '',
        teamName: '',
        members: '',
    });
    const [teamPhoto, setTeamPhoto] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    // Email regex: Basic validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex: Matches formats like "123 456 789", "+48 123 456 789", or "123456789"
    const phoneRegex = /^(?:\+48\s?)?\d{3}\s?\d{3}\s?\d{3}$/;

    const handleGameChange = (e) => {
        setSelectedGame(e.target.value);
        const newFormData = {...formData};
        Object.keys(newFormData).forEach(key => {
            if (key.includes('-')) {
                delete newFormData[key];
            }
        });
        setFormData(newFormData);
        setFieldErrors(prev => ({
            ...prev,
            teamName: '',
            members: ''
        }));
        // Reset logo when game changes
        setTeamPhoto(null);
        setLogoPreview(null);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // Real-time validation
        validateField(name, value);
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png'];
            const maxSize = 3 * 1024 * 1024; // 3MB

            if (!validTypes.includes(file.type)) {
                setFieldErrors(prev => ({
                    ...prev,
                    teamLogo: 'Dozwolone formaty: JPG, PNG'
                }));
                return;
            }

            if (file.size > maxSize) {
                setFieldErrors(prev => ({
                    ...prev,
                    teamLogo: 'Maksymalny rozmiar pliku to 3MB'
                }));
                return;
            }

            setTeamPhoto(file);
            setFieldErrors(prev => ({
                ...prev,
                teamLogo: ''
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'name':
                if (!value || value.trim().length < 2) {
                    error = 'Imię i nazwisko musi mieć co najmniej 2 znaki';
                }
                break;
            case 'email':
                if (!emailRegex.test(value)) {
                    error = 'Podaj poprawny adres email';
                }
                break;
            case 'phone':
                if (!phoneRegex.test(value)) {
                    error = 'Podaj poprawny numer telefonu (np. 123 456 789 lub +48 123 456 789)';
                }
                break;
            default:
                // team name and members validation
                if (name.includes('-team') && (!value || value.trim().length < 3)) {
                    error = 'Nazwa drużyny musi mieć co najmniej 3 znaki';
                    name = 'teamName';
                } else if (name.includes('-member') || name === 'mk-nickname') {
                    if (!value || value.trim().length < 2) {
                        error = 'Imię/nick członka drużyny musi mieć co najmniej 2 znaki';
                        name = 'members';
                    }
                }
                break;
        }

        setFieldErrors(prev => ({
            ...prev,
            [name]: error
        }));

        return !error;
    };

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    };

    const validateAllFields = () => {
        const errors = {};

        // Validate basic fields
        if (!formData.name || formData.name.trim().length < 2) {
            errors.name = 'Imię i nazwisko musi mieć co najmniej 2 znaki';
        }

        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.email = 'Podaj poprawny adres email';
        }

        if (!formData.phone || !phoneRegex.test(formData.phone)) {
            errors.phone = 'Podaj poprawny numer telefonu (np. 123 456 789 lub +48 123 456 789)';
        }

        // Validate for specific game
        if (selectedGame) {
            const prefix = selectedGame === '1' ? 'cs' :
                selectedGame === '2' ? 'lol' :
                    selectedGame === '3' ? 'rl' :
                        selectedGame === '4' ? 'ft' : 'mk';

            if (selectedGame !== '5') {
                const teamFieldName = `${prefix}-team`;
                if (!formData[teamFieldName] || formData[teamFieldName].trim().length < 3) {
                    errors.teamName = 'Nazwa drużyny musi mieć co najmniej 3 znaki';
                }

                const teamSize = getTeamSize(selectedGame);
                for (let i = 1; i <= teamSize; i++) {
                    const memberField = `${prefix}-member-${i}`;
                    if (!formData[memberField] || formData[memberField].trim().length < 2) {
                        errors.members = 'Imię/nick każdego członka drużyny musi mieć co najmniej 2 znaki';
                        break;
                    }
                }
            } else {
                // Mortal Kombat
                if (!formData['mk-nickname'] || formData['mk-nickname'].trim().length < 2) {
                    errors.teamName = 'Twój nickname musi mieć co najmniej 2 znaki';
                }
            }
        }

        setFieldErrors({...errors});
        return Object.keys(errors).length === 0;
    };

    const isFormValid = () => {
        // Basic fields validation
        const hasBasicFields = formData.name &&
            formData.name.trim().length >= 2 &&
            formData.email &&
            emailRegex.test(formData.email) &&
            formData.phone &&
            phoneRegex.test(formData.phone) &&
            selectedGame &&
            formData.terms;

        if (!hasBasicFields) return false;

        // Game-specific validation
        switch (selectedGame) {
            case '1': // Counter-Strike 2
                return formData['cs-team'] &&
                    formData['cs-team'].trim().length >= 3 &&
                    formData['cs-member-1'] &&
                    formData['cs-member-1'].trim().length >= 2 &&
                    formData['cs-member-2'] &&
                    formData['cs-member-2'].trim().length >= 2 &&
                    formData['cs-member-3'] &&
                    formData['cs-member-3'].trim().length >= 2 &&
                    formData['cs-member-4'] &&
                    formData['cs-member-4'].trim().length >= 2 &&
                    formData['cs-member-5'] &&
                    formData['cs-member-5'].trim().length >= 2;
            case '2': // League of Legends
                return formData['lol-team'] &&
                    formData['lol-team'].trim().length >= 3 &&
                    formData['lol-member-1'] &&
                    formData['lol-member-1'].trim().length >= 2 &&
                    formData['lol-member-2'] &&
                    formData['lol-member-2'].trim().length >= 2 &&
                    formData['lol-member-3'] &&
                    formData['lol-member-3'].trim().length >= 2 &&
                    formData['lol-member-4'] &&
                    formData['lol-member-4'].trim().length >= 2 &&
                    formData['lol-member-5'] &&
                    formData['lol-member-5'].trim().length >= 2;
            case '3': // Rocket League
                return formData['rl-team'] &&
                    formData['rl-team'].trim().length >= 3 &&
                    formData['rl-member-1'] &&
                    formData['rl-member-1'].trim().length >= 2 &&
                    formData['rl-member-2'] &&
                    formData['rl-member-2'].trim().length >= 2 &&
                    formData['rl-member-3'] &&
                    formData['rl-member-3'].trim().length >= 2;
            case '4': // Fortnite
                return formData['ft-team'] &&
                    formData['ft-team'].trim().length >= 3 &&
                    formData['ft-member-1'] &&
                    formData['ft-member-1'].trim().length >= 2 &&
                    formData['ft-member-2'] &&
                    formData['ft-member-2'].trim().length >= 2 &&
                    formData['ft-member-3'] &&
                    formData['ft-member-3'].trim().length >= 2;
            case '5': // Mortal Kombat
                return formData['mk-nickname'] && formData['mk-nickname'].trim().length >= 2;
            default:
                return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAllFields()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        try {
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
                    members = [
                        formData['mk-nickname']
                    ].filter(Boolean);
                    break;
                default:
                    break;
            }

            // Check if number of members matches the required team size
            const requiredPlayers = getTeamSize(selectedGame);
            if (selectedGame !== '5' && members.length !== requiredPlayers) {
                throw new Error(`Niepoprawna liczba członków drużyny. W tej grze wymagana jest liczba ${requiredPlayers}.`);
            }

            // Prepare form data for file upload
            const formDataToSend = new FormData();
            formDataToSend.append('teamName', teamName.trim());
            formDataToSend.append('gameId', selectedGame);
            formDataToSend.append('leaderName', formData['name'].trim());
            formDataToSend.append('leaderEmail', formData['email'].trim());
            formDataToSend.append('leaderPhone', formData['phone'].trim());

            // Add members as array
            formDataToSend.append('members', members.join(','));

            // Add team logo if exists
            if (teamPhoto) {
                formDataToSend.append('teamPhoto', teamPhoto);
            }

            const response = await fetch('/api/register', {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Wystąpił błąd podczas rejestracji');
            }

            setSubmitStatus('success');
            setFormData({});
            setSelectedGame('');
            setTeamPhoto(null);
            setLogoPreview(null);
            setFieldErrors({name: '', email: '', phone: '', teamName: '', members: '', teamLogo: ''});

        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error.message);
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
        <div
            className="w-full max-w-6xl mx-auto p-6 bg-[#232323] rounded-none md:rounded-lg mt-8 mb-8 md:border-[#2A2A2A] md:border-2 border-t-2 border-t-[#2A2A2A] border-b-2 border-b-[#2A2A2A]">
            <h2 className="text-4xl font-bold text-[#E0E0E0] mb-4 text-center">REJESTRACJA NA TURNIEJ</h2>
            <p className="text-[#95a5a6] text-lg md:text-xl font-light mb-8 text-center max-w-3xl mx-auto">
                Zapisz się na jeden z naszych turniejów już dziś! Wypełnij formularz poniżej i dołącz do rywalizacji.
            </p>

            {submitStatus === 'success' && (
                <div
                    className="mb-6 p-4 bg-green-800/30 border border-green-600 rounded-lg text-green-200 flex items-center gap-3">
                    <div>
                        <strong>Rejestracja przebiegła pomyślnie!</strong>
                    </div>
                </div>
            )}

            {submitStatus === 'error' && (
                <div
                    className="mb-6 p-4 bg-red-800/30 border border-red-600 rounded-lg text-red-200 flex items-center gap-3">
                    <div>
                        <strong>Wystąpił błąd podczas rejestracji</strong>
                        <p className="text-sm mt-1">{errorMessage || 'Spróbuj ponownie lub skontaktuj się z organizatorami.'}</p>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row lg:gap-8 h-full">
                <div className="lg:w-1/2 mb-8 lg:mb-0 flex flex-col flex-1">
                    <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A] flex flex-col flex-1">
                        <h3 className="text-2xl font-bold text-[#E0E0E0] mb-6 flex items-center gap-3">
                            <div
                                className="w-8 h-8 bg-[#FF5555] rounded-lg flex items-center justify-center text-white font-bold">1
                            </div>
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
                                    className={`w-full p-3 bg-[#1E1E1E] border ${fieldErrors.email ? 'border-[#FF5555]' : 'border-[#2A2A2A]'} rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]`}
                                    placeholder="twoj@email.com"
                                    required
                                    disabled={isSubmitting}
                                />
                                {fieldErrors.email && (
                                    <p className="text-[#FF5555] text-sm mt-1">{fieldErrors.email}</p>
                                )}
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
                                    className={`w-full p-3 bg-[#1E1E1E] border ${fieldErrors.phone ? 'border-[#FF5555]' : 'border-[#2A2A2A]'} rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]`}
                                    placeholder="123 456 789"
                                    required
                                    disabled={isSubmitting}
                                />
                                {fieldErrors.phone && (
                                    <p className="text-[#FF5555] text-sm mt-1">{fieldErrors.phone}</p>
                                )}
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

                            <div>
                                <label className="block text-[#E0E0E0] mb-2 font-medium">
                                    Logo drużyny/zawodnika
                                </label>
                                <div className="flex items-center gap-4">
                                    <label className="cursor-pointer">
                                        <div className="px-4 py-2 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors">
                                            Wybierz plik
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/jpeg, image/png"
                                            onChange={handleLogoChange}
                                            className="hidden"
                                            disabled={isSubmitting}
                                        />
                                    </label>
                                    {logoPreview && (
                                        <div className="relative">
                                            <img
                                                src={logoPreview}
                                                alt="Podgląd loga"
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setTeamPhoto(null);
                                                    setLogoPreview(null);
                                                }}
                                                className="absolute -top-2 -right-2 bg-[#FF5555] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs cursor-pointer"
                                            >
                                                X
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <p className="text-[#95a5a6] text-xs mt-1">
                                    Dozwolone formaty: JPG, PNG (max 3MB)
                                </p>
                                {fieldErrors.teamLogo && (
                                    <p className="text-[#FF5555] text-sm mt-1">{fieldErrors.teamLogo}</p>
                                )}
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
                                        Akceptuję <span className="text-[#30E9EE] underline">regulamin</span> i wyrażam zgodę na przetwarzanie danych osobowych <span
                                        className="text-[#FF5555]">*</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extended information*/}
                <div className="lg:w-1/2 flex flex-col flex-1">
                    <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A] flex flex-col flex-1">
                        <h3 className="text-2xl font-bold text-[#E0E0E0] mb-6 flex items-center gap-3">
                            <div
                                className="w-8 h-8 bg-[#30E9EE] rounded-lg flex items-center justify-center text-black font-bold">2
                            </div>
                            Dane drużyny
                        </h3>

                        {!selectedGame && (
                            <div className="h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-[#A0A0A0] text-lg">Wybierz grę, aby wyświetlić pola drużyny</p>
                                    <p className="text-[#666] text-sm mt-2">Każda gra ma różne wymagania dotyczące
                                        składu</p>
                                </div>
                            </div>
                        )}

                        {selectedGame && (
                            <div className="space-y-6">
                                <div className="bg-[#2A2A2A]/30 rounded-lg p-4 border border-[#30E9EE]/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3 h-3 bg-[#30E9EE] rounded-full"></div>
                                        <span
                                            className="text-[#30E9EE] font-semibold">{getGameName(selectedGame)}</span>
                                    </div>
                                    <p className="text-[#A0A0A0] text-sm">
                                        {getTeamSize(selectedGame) === 1
                                            ? 'Turniej indywidualny - wystarczy podać swój nickname'
                                            : `Drużyna ${getTeamSize(selectedGame)}-osobowa - wprowadź dane wszystkich członków`
                                        }
                                    </p>
                                </div>

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
                                                {Array.from({length: getTeamSize(selectedGame)}, (_, i) => (
                                                    <div key={i} className="relative">
                                                        <div
                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#30E9EE] rounded-full flex items-center justify-center text-black text-xs font-bold">
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

            <div className="mt-8 pt-6 border-t border-[#2A2A2A] flex flex-col items-center">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValid()}
                    className="bg-[#c0392b] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#e74c3c] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-[#c0392b] flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div
                                className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            REJESTROWANIE...
                        </>
                    ) : (
                        <>
                            <span>ZAREJESTRUJ SIĘ NA TURNIEJ</span>
                        </>
                    )}
                </button>

                {!isFormValid() && (
                    <p className="text-[#FF5555] text-sm text-center mt-3">
                        Wypełnij wszystkie wymagane pola poprawnie, aby się zarejestrować
                    </p>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A2A2A] text-center">
                <p className="text-[#95a5a6] text-sm">
                    Masz pytania?{' '}
                    <a
                        href="/contact"
                        className="text-[#30E9EE] underline cursor-pointer hover:text-[#FF5555] transition-colors"
                    >
                        Skontaktuj się z nami
                    </a>
                </p>
            </div>
        </div>
    );
}