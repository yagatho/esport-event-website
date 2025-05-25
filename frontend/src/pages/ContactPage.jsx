import React, { useState } from 'react';

export default function HomePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Symulacja wysyłania formularza
            await new Promise(resolve => setTimeout(resolve, 1500));

            // W rzeczywistej aplikacji tutaj byłoby wysyłanie danych
            console.log('Form data:', formData);

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-[#232323] rounded-none md:rounded-lg mt-8 mb-8 md:border-[#2A2A2A] md:border-2 border-t-2 border-t-[#2A2A2A] border-b-2 border-b-[#2A2A2A]">
            <h2 className="text-4xl font-bold text-[#E0E0E0] mb-6 text-center">KONTAKT</h2>

            <p className="text-[#95a5a6] text-xl md:text-2xl font-light mb-10 max-w-4xl">
                Masz pytania dotyczące wydarzenia, partnerstwa lub uczestnictwa? Skontaktuj się z nami za pomocą
                formularza poniżej.
            </p>

            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-800/30 border border-green-600 rounded text-green-200">
                    Wiadomość została wysłana pomyślnie!
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-800/30 border border-red-600 rounded text-red-200">
                    Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.
                </div>
            )}

            <div className="space-y-6">
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
                        className="w-full p-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent transition-all duration-200 hover:border-[#3A3A3A]"
                        placeholder="twoj@email.com"
                        required
                        disabled={isSubmitting}
                    />
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

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="mx-auto md:w-auto bg-[#c0392b] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#e74c3c] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Wysyłanie...
                        </>
                    ) : (
                        'Wyślij wiadomość'
                    )}
                </button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A2A2A] text-center">
                <p className="text-[#95a5a6] text-sm">
                    Odpowiemy na Twoją wiadomość w ciągu <strong className="text-[#E0E0E0]">24 godzin</strong>
                </p>
            </div>
        </div>
    );
}