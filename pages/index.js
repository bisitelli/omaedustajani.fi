import React, { useState } from 'react';
import '../styles/app.css';

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

    const answers = {
      email: formData.email,
      tele: formData.tele,
      autovakuutus: formData.autovakuutus ? "On" : "Ei ole",
      kotivakuutus: formData.kotivakuutus ? "On" : "Ei ole",
      henkilovakuutus: formData.henkilovakuutus ? "On" : "Ei ole",
      lemmikkivakuutus: formData.lemmikkivakuutus ? "On" : "Ei ole",
      yhtiot: selectedCompanies.join(', '),
    };

    // Lähetetään data palvelimelle
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers)
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

  

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Kilpailuta <br /> vakuutukset <br /> <span style={{ color: '#007bff' }}>helposti</span></h1>
          <p>✓ Räätälöityjä ratkaisuja juuri sinun tarpeisiin</p>
          <p>✓ Markkinoiden kilpailukykyisimmät terveysvakuutukset</p>
          <p>✓ Saat täyskaskoon heti 80 % bonuksen</p>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <h2>Mitä haluat vakuuttaa?</h2>
            <div>
              <input
                type="checkbox"
                id="autovakuutus"
                name="autovakuutus"
                checked={formData.autovakuutus}
                onChange={handleChange}
              />
              <label htmlFor="autovakuutus">Ajoneuvo</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="kotivakuutus"
                name="kotivakuutus"
                checked={formData.kotivakuutus}
                onChange={handleChange}
              />
              <label htmlFor="kotivakuutus">Koti</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="henkilovakuutus"
                name="henkilovakuutus"
                checked={formData.henkilovakuutus}
                onChange={handleChange}
              />
              <label htmlFor="henkilovakuutus">Henkilö</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="lemmikkivakuutus"
                name="lemmikkivakuutus"
                checked={formData.lemmikkivakuutus}
                onChange={handleChange}
              />
              <label htmlFor="lemmikkivakuutus">Lemmikki</label>
            </div>

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

      <footer className="footer">
        <p>© 2024 Omaedustajani.fi. Kaikki oikeudet pidätetään.</p>
      </footer>
    </div>
  );
}

export default App;
