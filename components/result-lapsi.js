import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../styles/lapsi-vakuutus.css';

function Result({ answers, resetTest }) {
    const [fade, setFade] = useState('fade-in');

    useEffect(() => {
        // Käynnistä fade-in animaatio, kun komponentti ladataan
        setFade('fade-in');
    }, []);


    return (
        <div className={`result-container ${fade}`}>
            <h2>Kiitos kyselyyn osallistumisesta!</h2>
            <p></p>
            <button type='submit' className='sulje-testi' onClick={resetTest}>Sulje testi</button>
            <p className='birra-solutions'>Powered by Birra Solutions</p>
        </div>
    );
}

export default Result;
