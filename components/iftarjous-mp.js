import React, { useState, useEffect } from 'react';
import '../styles/millainen-mp-olet.css'; // Varmista, että CSS-tiedostosi on mukana

function Iftarjous({ onNextStep, name, phone, answers }) {
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

  const handleButtonClick = async (action) => {
    const formData = {
      name,
      phone,
      answers,
      action,
      surveyType: 'Moottoripyörä',
    };
    
    await handleSubmit(formData); // Send the form data
    onNextStep(); // Move directly to the next step without fade-out
  };

  return (
    <div className={'tarjous-container'}>
      <h2>Voita 100€ S-ryhmän lahjakortti!</h2>
      <p className='tarjous-teksti'>Kilpailuita moottoripyöräsi vakuutus If:llä. Tarjousten ottaneiden kesken arvotaan 100€ S-ryhmän lahjakortti!</p>
      <button onClick={() => handleButtonClick('pyydä tarjous')} className='tarjous-btn'>Pyydä tarjous!</button><br /><br />
      <button onClick={() => handleButtonClick('näytä tulos')} className='tulos-btn'>Näytä tulos</button>
      <p className='birra-solutions'>Powered by Birra Solutions</p>
    </div>
  );
}

export default Iftarjous;
