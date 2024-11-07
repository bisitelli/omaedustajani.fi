import React, { useState, useEffect } from 'react';
import '../styles/millainen-mp-olet.css'; // Varmista, että CSS-tiedostosi on mukana

const handleSubmit = async (formData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Sähköposti lähetetty onnistuneesti');
    } else {
      console.log('Virhe sähköpostin lähetyksessä');
    }
  } catch (error) {
    console.error('Virhe:', error);
  }
};

function Iftarjous({ onNextStep, name, phone, answers }) {
  const [fade, setFade] = useState('fade-in'); // Aloitusfade-in

  const handleButtonClick = (action) => {
    const formData = {
      name,
      phone,
      answers,
      action, // Lisätään action-tieto
      surveyType: 'Moottoripyörä',
    };
    
    handleSubmit(formData);
    
    setFade('fade-out'); // Aloita fade-out
    setTimeout(() => {
      onNextStep(); // Siirry seuraavaan vaiheeseen fade-outin jälkeen
    }, 500); // Odota animaation loppumista
  };

  return (
    <div className={`tarjous-container ${fade}`}>
      <h2>Voita 100€ S-ryhmän lahjakortti!</h2>
      <p className='tarjous-teksti'>Kilpailuita moottoripyöräsi vakuutus If:llä. Tarjousten ottaneiden kesken arvotaan 100€ S-ryhmän lahjakortti!</p>
      <button onClick={() => handleButtonClick('pyydä tarjous')} className='tarjous-btn'>Pyydä tarjous!</button><br /><br />
      <button onClick={() => handleButtonClick('näytä tulos')} className='tulos-btn'>Näytä tulos</button>
      <p className='birra-solutions'>Powered by Birra Solutions</p>
    </div>
  );
}

export default Iftarjous;
