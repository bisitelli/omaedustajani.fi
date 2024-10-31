import React, { useState, useEffect } from 'react';
import '../styles/app.css'; // Oletetaan, että CSS-tyylit on määritelty
import Image from 'next/image';
import logo from '../images/If-logo.svg';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    tele: '',
    autovakuutus: false,
    kotivakuutus: false,
    henkilovakuutus: false,
    lemmikkivakuutus: false,
  });

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdownin aukiolotila

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCompanySelection = (company) => {
    if (selectedCompanies.includes(company)) {
      setSelectedCompanies(selectedCompanies.filter(c => c !== company));
    } else {
      setSelectedCompanies([...selectedCompanies, company]);
    }
  };

  const handleRemoveCompany = (company) => {
    setSelectedCompanies(selectedCompanies.filter(c => c !== company));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      email: formData.email,
      tele: formData.tele,
      autovakuutus: formData.autovakuutus ? "On" : "Ei ole",
      kotivakuutus: formData.kotivakuutus ? "On" : "Ei ole",
      henkilovakuutus: formData.henkilovakuutus ? "On" : "Ei ole",
      lemmikkivakuutus: formData.lemmikkivakuutus ? "On" : "Ei ole",
      yhtiot: selectedCompanies.join(', '),
    };

    // Lähetetään data palvelimelle
    fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    })
    .then((response) => response.text())
    .then((data) => {
      alert('Viestisi on lähetetty!');
      // Nollaa lomake
      setFormData({
        email: '',
        tele: '',
        autovakuutus: false,
        kotivakuutus: false,
        henkilovakuutus: false,
        lemmikkivakuutus: false,
      });
      setSelectedCompanies([]);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Tapahtui virhe viestin lähetyksessä.');
    });
  };

  useEffect(() => {
    // Estetään vieritys mobiililaitteilla
    const handleScrollLock = () => {
      if (window.innerWidth <= 768) {
        document.body.style.overflowY = 'auto'; // Estetään vieritys
      } else {
        document.body.style.overflowX = 'hidden'; // Sallitaan vieritys
      }
    };

    // Kutsutaan funktiota alussa ja aina kun ikkuna muuttaa kokoa
    handleScrollLock();
    window.addEventListener('resize', handleScrollLock);

    // Poistetaan tapahtumankuuntelija, kun komponentti poistetaan käytöstä
    return () => {
      window.removeEventListener('resize', handleScrollLock);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Ylätunniste */}
      <header className="header">
        <nav className="navbar">
          <Image src={logo} />
        </nav>
      </header>

      {/* Hero-segmentti */}
      <section className="hero">
        <div className='hero-content'>
          <h1>Kilpailuta <br></br> vakuutukset <br></br> <span style={{ color: '#007bff' }}>helposti</span></h1>
          <p><span style={{ fontSize: '28px', color: '#007bff' }}>✓</span>Räätälöityjä ratkaisuja juuri sinun tarpeisiin</p>
          <p><span style={{ fontSize: '28px', color: '#007bff' }}>✓</span>Markkinoiden kilpailukykyisimmät terveysvakuutukset</p>
          <p><span style={{ fontSize: '28px', color: '#007bff' }}>✓</span>Saat täyskaskoon heti 80 % bonuksen</p>
        </div>

        <div className='contact-form'>
          <form onSubmit={handleSubmit}>
            <h2>Mitä haluat vakuuttaa?</h2>
            <div id='autovakuutus-container'>
              <input
                type='checkbox'
                id='autovakuutus'
                name='autovakuutus'
                checked={formData.autovakuutus}
                onChange={handleChange}
              />
              <label htmlFor='autovakuutus'>Ajoneuvo</label>
            </div>
            <div id='kotivakuutus-container'>
              <input
                type='checkbox'
                id='kotivakuutus'
                name='kotivakuutus'
                checked={formData.kotivakuutus}
                onChange={handleChange}
              />
              <label htmlFor='kotivakuutus'>Koti</label>
            </div>
            <div id='henkilovakuutus-container'>
              <input
                type='checkbox'
                id='henkilovakuutus'
                name='henkilovakuutus'
                checked={formData.henkilovakuutus}
                onChange={handleChange}
              />
              <label htmlFor='henkilovakuutus'>Henkilö</label>
            </div>
            <div id='lemmikkivakuutus-container'>
              <input
                type='checkbox'
                id='lemmikkivakuutus'
                name='lemmikkivakuutus'
                checked={formData.lemmikkivakuutus}
                onChange={handleChange}
              />
              <label htmlFor='lemmikkivakuutus'>Lemmikki</label>
            </div>

            {/* Dropdown yhtiövalinnalle */}
            <div className='dropdown-yhtiot'>
              <h3>Valitse nykyinen yhtiösi:</h3>
              <button type='button' className='dropdown-btn-yhtiot' onClick={toggleDropdown}>
                Valitse nykyinen yhtiösi
              </button>
              {isDropdownOpen && (
                <div className='dropdown-content-yhtiot'>
                  {['Op Pohjola', 'Lähitapiola', 'Fennia', 'Turva', 'Pohjantähti', 'Pop Vakuutus', 'Muu'].map((company) => (
                    <a href="#" key={company} onClick={(e) => {
                      e.preventDefault();
                      handleCompanySelection(company);
                    }}>
                      {company}
                    </a>
                  ))}
                </div>
              )}
              {selectedCompanies.length > 0 && (
                <ul className='selected-companies'>
                  {selectedCompanies.map((company) => (
                    <li key={company} className='selected-item'>
                      {company}
                      <span className='remove-item' onClick={() => handleRemoveCompany(company)}> ✖ </span>
                    </li>
                  ))}
                </ul>
              )}
              <p>ⓘ voit valita useita</p>
            </div>

            {/* Yhteystiedot */}
            <div className='yhteystiedot-form'>
              <h3>Täytä yhteystietosi:</h3>
              <input
                type='email'
                name='email'
                placeholder='Sähköposti'
                required
                value={formData.email}
                onChange={handleChange}
              />
              <br />
              <input
                type='tel'
                name='tele'
                placeholder='Puhelinnumero'
                required
                value={formData.tele}
                onChange={handleChange}
              />
            </div>

            <div className='laheta-btn-div'>
              <button type='submit' className='laheta-btn' id='laheta-btn'>Lähetä</button>
            </div>

            <div className='powered-by-birrasolutions'>
              <p>Powered by Birra Solutions</p>
            </div>
          </form>
        </div>

      </section>

      {/* Ominaisuudet */}
      <section id="features" className="features" style={{display: 'none'}}>
        <h2>Arvosteluja</h2>
        <div className="feature-cards">
          <div className="card">
            <h1>Juha</h1>
            <h3>Paras edustaja ikinä</h3>
          </div>
          <div className="card">
            <h1>Pasi</h1>
            <h3>Hyvä jätkä! Vie nykyään pojan jääkiekko treeneihin.</h3>
          </div>
          <div className="card">
            <h1>Sampo</h1>
            <h3>Säästin vakuutuksissa 50 %!</h3>
          </div>
          <div className="card">
            <h1>Minna</h1>
            <h3>Tarjosin tytärtäni puhelun jälkeen.</h3>
          </div>
        </div>
      </section>

      {/* Yhteystiedot */}
      <section id="contact" className="logo-mobiili">
        <img src={logo}></img>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Omaedustajani.fi. Kaikki oikeudet pidätetään.</p>
      </footer>
    </div>
  );
}

export default App;
