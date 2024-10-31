import React, { useState, useEffect } from 'react';
import '../styles/millainen-mp-olet.css';
import Questions from '../components/question-mp';
import Result from '../components/result-mp';
import Iftarjous from '../components/iftarjous-mp'; // Lisää Iftarjous komponentti

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

  const handleSubmitUser = () => {
    if (name && validatePhoneNumber(phone)) {
      setErrorMessage(''); // Tyhjennä virheviesti, jos kaikki on ok
      handleNextStep();
    } else {
      setErrorMessage('Lisää nimesi ja oikea puhelinnumero (alku 040, 041, 044, 045 tai 050).');
    }
  };

  const resetTest = () => {
    setName('');
    setPhone('');
    setAnswers({});
    setStep(1);
  };

  return (
    <div className='background-container'>
      <div className='content-container'>
        {step === 1 && (
          <div className='form-container'>
            <h1>Millainen motoristi olet?</h1>
            <input
              className='contact-input'
              type="text"
              placeholder="Nimi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className='contact-input'
              type="tel"
              placeholder="Puhelinnumero"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button className='aloita-button' onClick={handleSubmitUser}>Aloita testi!</button>
            <p>Lisää yhteystietosi niin pääset täyttämään testin. Yhteystietoja ei jaeta eteenpäin. Jättämällä yhteystietosi olet mukana arvonnassa.</p>
            <p className='birra-solutions'>Powered by Birra Solutions</p>
          </div>
        )}

        {step === 2 && (
          <Questions
            answers={answers}
            setAnswers={setAnswers}
            onNextStep={handleNextStep}
          />
        )}

        {step === 2.5 && (
          <Iftarjous
            onNextStep={handleNextStep} // Lähetä vastaukset sähköpostiin
            name={name}
            phone={phone}
            answers={answers}
          />
        )}

        {step === 3 && <Result answers={answers} name={name} resetTest={resetTest} />}
      </div>
    </div>
  );
}

export default App;
