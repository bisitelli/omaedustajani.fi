import React, { useState } from 'react';
import Image from 'next/image'; // Ei muuta, koska käytämme Image-komponenttia Next.js:ssä
import '../styles/vauva-vakuutus.css';
import Question from '../components/question-vauva';
import Results from '../components/result-vauva';

function App() {
  const [step, setStep] = useState(1); // Alustetaan steppi 1
  const [answers, setAnswers] = useState({}); // Alustetaan vastaukset

  // Siirrytään seuraavaan vaiheeseen
  const nextStep = () => setStep(step + 1);
  
  // Siirrytään edelliseen vaiheeseen (jos tarpeen)
  const prevStep = () => setStep(step - 1);

  // Kyselyn valmistuttua siirrytään tulossivulle
  const handleComplete = () => setStep(3);

  return (
    <div className='app'>
      {step === 1 && (
        <div className="welcome-container">
          <div className="welcome-box">
            <button onClick={nextStep} className="start-button">
              Aloita kysely
            </button>
            {/* Käytetään kuvaa public-kansiosta ilman importia */}
            <Image src="/images/Libero-logo-1.png" alt='libero-logo' className='libero-logo' width={150} height={30} />
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <Question setAnswers={setAnswers} onNext={nextStep} onBack={prevStep} onComplete={handleComplete} />
        </div>
      )}
      
      {step === 3 && (
        <div>
          <Results answers={answers} />
        </div>
      )}
    </div>
  );
}

export default App;
