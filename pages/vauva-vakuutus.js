import React, { useState } from 'react';
import Image from 'next/image';
import '../styles/vauva-vakuutus.css'
import Question from '../components/question-vauva';
import Results from '../components/result-vauva';
import liberoLogo from '../images/Libero-logo-1.png';

function App() {
  const [step, setStep] = useState(1); // Alustetaan steppi 1

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
            <h2>Vastaa kyselyyn ja voita vuoden vaipat!</h2>
            <button onClick={nextStep} className="start-button">
              Aloita
            </button>
            <Image src={liberoLogo} alt='libero-logo' className='libero-logo' />
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <Question onNext={nextStep} onBack={prevStep} onComplete={handleComplete} />
        </div>
      )}
      
      {step === 3 && (
        <div>
          <Results />
        </div>
      )}
    </div>
  );
}

export default App;
