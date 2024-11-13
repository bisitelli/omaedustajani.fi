import React, { useState, useEffect } from 'react';
import '../styles/vauva-vakuutus.css'; // Varmista, että CSS-tiedostosi on mukana

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
  const [fade] = useState('fade-in'); // Aloitusfade-in

  const handleButtonClick = (action) => {
    const formData = {
      name,
      phone,
      answers,
      action, // Lisätään action-tieto
      surveyType: 'Vauvavakuutus',
    };
    
    handleSubmit(formData);
    
    onNextStep(); // Siirry seuraavaan vaiheeseen fade-outin jälkeen

  };

  return (
    <div className={`tarjous-container ${fade}`}>
      <p className='tarjous-teksti'><span className='right-icon'>✓</span> Etuhinta ensimmäiseksi vuodeksi</p>
      <p className='tarjous-teksti'><span className='right-icon'>✓</span> Äidin henkivakuutus ilmaiseksi</p>
      <p className='tarjous-teksti'><span className='right-icon'>✓</span> Vakuutus jo ennen rakenneultraa</p>
      <p className='tarjous-teksti-pitka'>Vauvasi ensimmäinen vakuutus tuo mielenrauhaa.<br /> Haluaisitko hyödyntää etuhinnan?</p>
      <button onClick={() => handleButtonClick('pyydä tarjous')} className='tarjous-btn'>Kyllä</button><br />
      <button onClick={() => handleButtonClick('näytä tulos')} className='tulos-btn'>Ei kiitos</button>
      <p className='birra-solutions'>Powered by Birra Solutions</p>
    </div>
  );
}

export default Iftarjous;
