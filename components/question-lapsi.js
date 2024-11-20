import React, { useState } from 'react';
import '../styles/lapsi-vakuutus.css';

const questions = [
    { id: 1, text: 'Onko sinulla tällä hetkellä harkinnassa sairaskuluvakuutuksen ottaminen lapsellesi?', options: ['Kyllä', 'Lapseni on vakuutettu muualla', 'Ei, en näe tarvetta'] },
    { id: 2, text: 'Tiesitkö, että If tarjoaa etälääkäripalvelun ilman omavastuuta?', options: ['Kyllä, tiedän tämän', 'En, tämä oli uutta tietoa'] },
    { id: 3, text: 'Tiesitkö, että If:llä vaakutuksesta korvataan reseptilääkkeiden lisäksi myös perusvoiteet?', options: ['Kyllä, tiedän tämän', 'En, tämä oli uutta tietoa'] },
    { id: 4, text: 'Tiesitkö, että If sairaskuluvakuutus kattaa lapsesi urheiluharrastukset aina 12 ikävuoteen asti?', options: ['Kyllä, tiedän tämän', 'En, tämä oli uutta tietoa'] },
    { id: 5, text: 'Tiesitkö, että lapsen vakuutus mahdollistaa nopeamman hoitoon pääsyn ja erikoislääkäri käynnit ilman pitkää jonotusta?', options: ['Kyllä, tiedän tämän', 'En, tämä oli uutta tietoa'] },
    { id: 6, text: 'Kuinka tärkeää sinulle on mielenrauha siitä, että lapsesi hoitokulut ovat kateittuina yllättävien tilanteiden varalta?', options: ['Erittäin tärkeää', 'Melko tärkeää', 'Ei kovin tärkeää'] },
    { id: 7, text: 'Miten tärkeänä pidät mahdollisuutta maksaa vakuutuslaskut 12 erässä ilman lisäkuluja?', options: ['Erittäin tärkeänä', 'Melko tärkeänä', 'En kovin tärkeänä'] },
    { id: 8, text: 'Ifin terveysapu auttaa ennen lääkäriä korvauksissa ja hoitopaikan valinnassa. Kuinka hyödylliseksi koet tämän?', options: ['Erittäin hyödyllisenä', 'Melko hyödyllisenä', 'En kovin hyödyllisenä'] },
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
