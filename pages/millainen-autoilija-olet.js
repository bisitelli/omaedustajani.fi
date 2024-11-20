import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/millainen-autoilija-olet.css';
import Questions from '../components/question-autoilija';
import Result from '../components/result-autoilija';
import Iftarjous from '../components/iftarjous-autoilija'

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [fade, setFade] = useState('fade-in');

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(040|041|044|045|050)\d{5,}$/;
    return phoneRegex.test(phone);
  };

  const handleNextStep = () => {
    setFade('fade-out'); // Fade-out ennen vaiheen vaihtoa
    setTimeout(() => {
      if (step === 2) {
        setStep(2.5); // Siirrytään extra vaiheeseen
      } else if (step === 2.5) {
        setStep(3); // Siirrytään lopputulokseen (tai seuraavaan vaiheeseen)
      } else {
        setStep(step + 1); // Jatketaan normaalisti muissa tilanteissa
      }
      setFade('fade-in'); // Fade-in seuraavalle vaiheelle
    }, 500); // Animaatio kestää 500ms
  };

  useEffect(() => {
    setFade('fade-in'); // Vaihda fade-in uuteen vaiheeseen siirtymisen jälkeen
  }, [step]);

  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked)
  };

  const handleSubmitUser = () => {
    const checkbox = document.querySelector('.checkbox');
    if (name && validatePhoneNumber(phone) && checkbox.checked) {
      setErrorMessage(''); // Tyhjennä virheviesti, jos kaikki on ok
      handleNextStep();
    } else {
      setErrorMessage('Lisää nimesi, oikea puhelinnumero ja hyväksy ehdot.');
    }
  };

  const resetTest = () => {
    setName('');
    setPhone('');
    setAnswers({});
    setStep(1);
  };

  return (
    <div className='background-container'> {/* Taustakontti */}
      <div className='content-container'> {/* Sisällön kontti */}
        {step === 1 && (
          <div className={`form-container ${fade}`}>
              <h1>Millainen autoilija olet?</h1>
              <input className='contact-input'
                type="text"
                placeholder="Nimi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input className='contact-input'
                type="tel"
                placeholder="Puhelinnumero"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {errorMessage && <p style={{ color: 'red', maxWidth: '350px', fontSize: '10px' }}>{errorMessage}</p>}
              <button className='aloita-button' onClick={handleSubmitUser}>Aloita</button>
              <label className='checkbox-label' style={{ display: 'flex', textAlign: "center", justifyContent: "center" }}>
                            <input style={{ display: 'inline-block' }} type='checkbox' className='checkbox' onChange={handleCheckboxChange} required></input>
                            Hyväksy {" "} <Link href="/kilpailuehdot" target="_blank">
                            kilpailun ehdot</Link>.
                        </label>
              <p className='birra-solutions'>Powered by Birra Solutions</p>
          </div>
        )}

        {step === 2 && <Questions answers={answers} setAnswers={setAnswers} onNextStep={handleNextStep} />}
        {step === 2.5 && <Iftarjous onNextStep={handleNextStep} name={name} phone={phone} answers={answers} />}
        {step === 3 && <Result answers={answers} resetTest={resetTest} />}
      </div>
    </div>
  );
}

export default App;
