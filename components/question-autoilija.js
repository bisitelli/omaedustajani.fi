import React, { useState } from 'react';
import '../styles/millainen-autoilija-olet.css';

const questions = [
  { id: 1, text: 'Omistatko auton?', options: ['Kyllä', 'En'] },
  { id: 2, text: 'Minkä ikäinen olet?', options: ['18-24', '25-45', 'Yli 45-vuotta']},
  { id: 3, text: 'Millainen auto sinulla on?', options: ['Urheiluauto, nopeus ennen kaikkea!', 'Maasturi, haluan ajaa missä tahansa säässä ja maastossa.', 'Sähköauto, ympäristöystävällisyys ja uudet innovaatiot kiinnostavat.', 'Sedan/farmari, luotan klassiseen ja varmaan valintaan.'] },
  { id: 4, text: 'Kuinka vanha autosi on?', options: ['6-10 vuotta vanha - luotettava kaveri.', '3–5 vuotta vanha – edelleen hyvässä kunnossa.', 'Yli 10 vuotta vanha – vanha, mutta uskollinen.', 'Alle 2 vuotta vanha – uutuuden huumaa!'] },
  { id: 5, text: 'Missä ajat eniten?', options: ['Maaseudulla tai pienemmillä teillä – rauhallista, mutta joskus yllätyksiä tiellä.', 'Siellä sun täällä – ei ole tiettyä ajomaastoa.', 'Moottoriteillä tai pitkää matkaa – pitkät ajomatkat ja nopeat väylät.', 'Suunnitelen reitin vain, jos en tunne aluetta - muuten tiedän jo parhaat reitit.'] },
  { id: 6, text: 'Miten tärkeänä pidät autosi vakuutusta?', options: ['Erittäin tärkeä – haluan parhaan suojan.', 'Tärkeä, mutta hinta on ratkaiseva.', 'En kovin tärkeänä, minulle riittää perustason vakuutus.'] },
  { id: 7, text: 'Maksatko mielestäsi vakuutuksesta liikaa tällä hetkellä?', options: ['Kyllä', 'En'] }
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
        onNextStep(); // Siirry tulokseen
      }
      setFade('fade-in'); // Fade-in uuden kysymyksen tullessa esiin
    }, 500); // Ajan (500ms) on oltava sama kuin CSS-transitiolla
  };

  return (
    <div className={`container-questions ${fade}`}>
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
