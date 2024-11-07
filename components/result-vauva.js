import React, { useState } from 'react';
import '../styles/vauva-vakuutus.css';

function Result() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('');

    // Tämä on uusi handleSubmit ilman event-parametria
    const handleSubmit = async () => {
        const formData = {
            name,
            email,
            phone,
            answers,
            surveyType: 'Vauvavakuutus',
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmissionStatus('Sähköposti lähetetty onnistuneesti');
            } else {
                setSubmissionStatus('Virhe sähköpostin lähetyksessä');
            }
        } catch (error) {
            console.error('Virhe:', error);
            setSubmissionStatus('Virhe sähköpostin lähetyksessä');
        }
    };

    return (
        <div className="results-container">
            <div className="results-content-box">
                <div className="results-info-section">
                    <h2>Tiesitkö, että If:in syntymättömän lapsen vakuutus kattaa:</h2>
                    <ul>
                        <li>✅ Suomen kattavin suorakorvausverkosto</li>
                        <li>✅ Lapsen harrastukset 12-vuotiaaksi asti</li>
                        <li>✅ Terveysapu-palvelu on apunasi 24/7</li>
                        <li>✅ Lapsen tapaturmallisen pysyvän vamman</li>
                    </ul>
                </div>
                <div className="results-form-section">
                    <h2>Ota tarjous If:in syntymättömän lapsen vakuutuksesta niin voit voittaa vuoden vaipat Liberolta!</h2>
                    {/* Ei tarvitse enää onSubmit, vain napin klikkaus */}
                    <div className="results-form">
                        <input
                            type="text"
                            placeholder="Nimi"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Sähköposti"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Puhelinnumero"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {/* Muutettu: nappi kutsuu handleSubmit suoraan */}
                        <button type="button" onClick={handleSubmit}>Osallistu</button>
                        {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
                        <footer className="footer">
                            Powered by Birra Solutions
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;
