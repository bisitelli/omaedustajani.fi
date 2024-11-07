import React, { useState } from 'react';
import '../styles/vauva-vakuutus.css';

const questions = [
  { id: 1, text: 'Onko sinulla tällä hetkellä harkinnassa vakuutuksen ottaminen syntymättömälle lapselle?', options: ['Kyllä, olen jo ottanut', 'Kyllä, harkitsen vielä', 'Ei, en näe tarvetta'] },
  { id: 2, text: 'Kuinka tärkeänä pidät, että lapsesi on vakuutettu jo enne syntymää?', options: ['Erittäin tärkeänä', 'Melko tärkeänä', 'En kovin tärkeänä'] },
  { id: 3, text: 'Tiesitkö, että syntymättömän lapsen vakuutus kattaa myös mahdollisia synnytyksessä tapahtuvia vahinkoja sekä äidille että lapselle?', options: ['Kyllä, tiedän tämän', 'En, tämä oli uutta tietoa'] },
  { id: 4, text: 'Pidätkö tärkeänä, että perheellä on taloudellista turvaa yllättävien terveyshaasteiden varalta jo ennen lapsen syntymää?', options: ['Erittäin tärkeänä', 'Kohtalaisen tärkeänä', 'En niin tärkeänä'] },
  { id: 5, text: 'Tiesitkö, että lapsen vakuutus mahdollistaa nopeamman hoitoon pääsyn ja erikoislääkäri käynnit ilman pitkää jonotusta?', options: ['Kyllä, tiedän tämän', 'En, tämä oli uutta tietoa'] },
  { id: 6, text: 'Kuinka tärkeää sinulle on mielenrauha siitä, että lapsesi hoitokulut ovat kateittuina yllättävien tilanteiden varalta?', options: ['Erittäin tärkeää', 'Melko tärkeää', 'Ei kovin tärkeää'] },
  { id: 7, text: 'Tiesitkö, että syntymättömän lapsen vakuutus kattaa lapsen myös hänen kasvaessaan?', options: ['Kyllä, tiesin tämän', 'En, tämä oli uutta tietoa'] },
  { id: 8, text: 'Mikä merkitsee sinulle eniten, kun valitset vakuutusta syntymättömälle lapsellesi?', options: ['Vakuutuksen kattavuus', 'Vakuutuksen hinta', 'Suorakorvaus ja vaivattomuus', 'Kaikki yllä mainitut'] },
];

function Questions({ answers, setAnswers, onNextStep }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [fade, setFade] = useState('fade-in'); // Alkuarvo 'fade-in'

  const handleAnswer = (answer) => {
    // Asetetaan fade-out, jotta kysymys katoaa hitaasti
    setFade('fade-out');

    // Viivästetyn ajan jälkeen vaihdetaan kysymys ja asetetaan fade-in
    setTimeout(() => {
      setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onNextStep(); // Siirry tulokseen ilman fade-in -efektiä
      }
      if (currentQuestion < questions.length - 1) {
        setFade('fade-in'); // Vain kun ei ole viimeinen kysymys
      } else {
        setFade(''); // Ei fade-efektiä viimeisen kysymyksen jälkeen
      }
    }, 500); // Ajan (500ms) on oltava sama kuin CSS-transitiolla
  };

  return (
    <div className={`container-questions ${fade}`}>
      <h2 className='kysymykset'>{questions[currentQuestion].text}</h2>
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
