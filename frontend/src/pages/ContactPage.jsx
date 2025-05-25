import React, { useState, useEffect } from 'react';

export default function HomePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isFormValidState, setIsFormValidState] = useState(false);

    // Email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear email error when editing email
        if (name === 'email') {
            setEmailError('');
        }
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Validate email field (used for onBlur and submission)
    const validateEmail = (value) => {
        return value.trim() ? (emailRegex.test(value) ? '' : 'Podaj poprawny adres email') : '';
    };

    // Handle blur event for email validation
    const handleEmailBlur = (e) => {
        const { value } = e.target;
        setEmailError(validateEmail(value));
    };

    // Validation function (returns boolean, does not set state)
    const checkFormValidity = () => {
        return (
            formData.name.trim() &&
            formData.email.trim() &&
            emailRegex.test(formData.email) &&
            formData.subject.trim() &&
            formData.message.trim() &&
            formData.terms
        );
    };

    // Validate form fields (called on submit)
    const validateForm = () => {
        const emailValid = formData.email.trim() && emailRegex.test(formData.email);
        const isValid =
            formData.name.trim() &&
            emailValid &&
            formData.subject.trim() &&
            formData.message.trim() &&
            formData.terms;

        // Set email error for submission
        if (!emailValid) {
            setEmailError(validateEmail(formData.email));
        }

        return isValid;
    };

    // Update form validity whenever formData changes
    useEffect(() => {
        setIsFormValidState(checkFormValidity());
    }, [formData]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Wystąpił błąd podczas rejestracji');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                terms: false,
            });
            setEmailError('');
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="w-full max-w-4xl mx-auto p-6 bg-[#232323] rounded-none md:rounded-lg mt-8 mb-8 md:border-[#2A2A2A] md:border-2 border-t-2 border-t-[#2A2A2A] border-b-2 border-b-[#2A2A2A]"
        >
            <h2 className="text-4xl font-bold text-[#E0E0E0] mb-4 text-center">KONTAKT</h2>

            <p className="text-[#95a5a6] text-lg md:text-xl font-light mb-8 max-w-3xl text-center">
                Masz pytania dotyczące wydarzenia, partnerstwa lub uczestnictwa?
            </p>
            <p className="text-[#95a5a6] text-lg md:text-xl font-light mb-8 max-w-3xl text-center">
                Skontaktuj się z nami za pomocą formularza poniżej.
            </p>

            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-800/30 border border-green-600 rounded text-green-200">
                    Wiadomość została wysłana pomyślnie!
                </div>
            )}

            {submitStatus === 'error' && (
                <div
                    className="mb-6 p-4 bg-red-800/30 border border-red-600 rounded-lg text-red-200 flex items-center gap-3"
                >
                    <div>
                        <strong>Wystąpił błąd podczas wysyłania</strong>
                        <p className="text-sm mt-1">
                            {errorMessage || 'Spróbuj ponownie lub skontaktuj się z organizatorami.'}
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A] flex flex-col flex-1 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-[#E0E0E0] mb-2 font-medium">
                        Imię i nazwisko <span className="text-[#c0392b]">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                        placeholder="Wpisz swoje imię i nazwisko"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-[#E0E0E0] mb-2 font-medium">
                        Email <span className="text-[#c0392b]">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleEmailBlur}
                        className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                        placeholder="twoj@email.com"
                        required
                        disabled={isSubmitting}
                    />
                    {emailError && <p className="text-[#FF5555] text-sm mt-1">{emailError}</p>}
                </div>

                <div>
                    <label htmlFor="subject" className="block text-[#E0E0E0] mb-2 font-medium">
                        Temat <span className="text-[#c0392b]">*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                        placeholder="Krótko opisz temat wiadomości"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-[#E0E0E0] mb-2 font-medium">
                        Treść <span className="text-[#c0392b]">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A] resize-vertical min-h-[120px]"
                        placeholder="Opisz szczegółowo swoją sprawę..."
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="border-t border-[#2A2A2A] pt-6">
                    <label className="flex items-start text-[#E0E0E0] cursor-pointer group">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleCheckboxChange}
                            className="mt-1 mr-3 w-4 h-4 text-[#30E9EE] bg-[#1E1E1E] border-[#2A2A2A] rounded focus:ring-[#30E9EE] focus:ring-2"
                            required
                            disabled={isSubmitting}
                        />
                        <span className="text-sm group-hover:text-[#30E9EE] transition-colors">
                         Akceptuję <span className="text-[#30E9EE] underline">regulamin</span> i wyrażam zgodę na
                         przetwarzanie danych osobowych <span className="text-[#FF5555]">*</span>
                         </span>
                    </label>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A2A2A] flex flex-col items-center">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValidState}
                    className="bg-[#c0392b] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#e74c3c] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-[#c0392b] flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div
                                className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"
                            ></div>
                            WYSYŁANIE...
                        </>
                    ) : (
                        <>
                            <span>WYŚLIJ WIADOMOŚĆ</span>
                        </>
                    )}
                </button>

                {!isFormValidState && !isSubmitting && (
                    <p className="text-[#FF5555] text-sm text-center mt-3">
                        Wypełnij wszystkie wymagane pola poprawnie, aby wysłać wiadomość
                    </p>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A2A2A] text-center">
                <p className="text-[#95a5a6] text-sm">
                    Odpowiemy na Twoją wiadomość w ciągu <strong className="text-[#E0E0E0]">24 godzin</strong>
                </p>
            </div>
        </div>
    );
}