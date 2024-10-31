import React, { useState } from 'react';
import '../styles/millainen-mp-olet.css';

const questions = [
  { id: 1, text: 'Omistatko moottoripyörän?', options: ['Kyllä', 'En'] },
  { id: 2, text: 'Millainen moottoripyörä sopii sinulle parhaiten?', options: ['Urheilupyörä – nopeus ja ketteryys ovat tärkeintä.', 'Matkapyörä – nautin pitkistä ja mukavista reissuista.', 'Klassinen chopper – tyyli ja asenne merkitsevät enemmän kuin nopeus.', 'Enduropyörä – rakastan ajaa maastossa ja seikkailuilla.'] },
  { id: 3, text: 'Kuinka usein ajat moottoripyörällä?', options: ['Harvoin, vain silloin tällöin.', 'Joka päivä – se on elämäntapani!', 'Viikonloppuisin – silloin kun on aikaa.', 'En omista moottoripyörää, mutta haaveilen sellaisesta.'] },
  { id: 4, text: 'Miten suhtaudut turvallisuuteen moottoripyöräillessä?', options: ['Suhtaudun turvallisuuteen rennosti – olen kokenut kuljettaja.', 'Turvavarusteet ovat välttämättömiä – ilman niitä en lähde.', 'Käytän kypärää ja perusvarusteita, mutta en liioittele.', 'Olen enemmänkin seikkailija, enkä stressaa turvavarusteista.'] },
  { id: 5, text: 'Miten suunnittelet moottoripyörämatkoja?', options: ['Teen yleiskuvan matkasta, mutta olen avoin muutoksille.', 'Suunnittelen reitin tarkasti etukäteen ja tiedän, mitä odottaa.', 'Lähden liikkeelle ja katson, mihin tie vie.', 'En ole vielä ehtinyt suunnitella, mutta haaveilen matkasta.'] },
  { id: 6, text: 'Miten kuvailisit ajotyyliäsi?', options: ['Rauhallista ja rentoa – nautin matkasta.', 'Nopeaa ja rohkeaa – pidän vauhdista!', 'Vaihtelevaa – vaihdan tyyliä tilanteen mukaan.'] },
  { id: 7, text: 'Miten reagoit vaikeisiin sääolosuhteisiin?', options: ['Koen sään vain osana seikkailua!', 'En pelkää ajaa huonollakaan säällä, mutta olen varovainen.', 'Ajan vain, kun sää on hyvä – turvallisuus ensin!', 'En ole vielä ehtinyt kokeilla moottoripyöräilyä sateessa.'] },
  { id: 8, text: 'Miten tärkeänä pidät moottoripyöräsi vakuutusta?', options: ['En ole miettinyt vakuutusta ollenkaan.', 'Erittäin tärkeä – haluan parhaan suojan.', 'En ole vielä miettinyt, mutta tiedän, että se on tarpeellinen.', 'Tärkeä, mutta valitsen perustason vakuutuksen.'] },
  

];

function Questions({ answers, setAnswers, onNextStep }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onNextStep(); // Siirry tulokseen
    }
  };

  return (
    <div className='container-questions'>
      <h2>{questions[currentQuestion].text}</h2>
        <div className='vastaus-vaihto-ehdot'>
          {questions[currentQuestion].options.map((option, index) => (
            <button className='vastaus-button' key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
        ))}
        </div>
      <p className='birra-solutions'>Powered by Birra Solutions</p>
    </div>
  );
}

export default Questions;
