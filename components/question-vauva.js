import React, { useState } from 'react';
import Image from 'next/image';
import kysymys1 from '../images/1.png';
import kysymys2 from '../images/2.png';
import kysymys3 from '../images/3.png';
import kysymys4 from '../images/4.png';
import kysymys5 from '../images/5.png';
import kysymys6 from '../images/6.png';
import kysymys7 from '../images/7.png';
import kysymys8 from '../images/8.png';
import '../styles/vauva-vakuutus.css';

function Question({ setAnswers, onComplete }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    // Kysymykset ja kuvat
    const questions = [
        {
            question: 'Onko sinulla tällä hetkellä harkinnassa vakuutuksen ottaminen syntymättömälle lapselle?',
            image: kysymys1,
            options: [
                'Kyllä, olen jo ottanut',
                'Kyllä, harkitsen vielä',
                'Ei, en näe tarvetta'
            ]
        },
        {
            question: 'Kuinka tärkeänä pidät, että lapsesi on vakuutettu jo ennen syntymää?',
            image: kysymys2,
            options: [
                'Erittäin tärkeänä',
                'Melko tärkeänä',
                'En kovin tärkeänä'
            ]
        },
        {
            question: 'Tiesitkö, että syntymättömän lapsen vakuutus kattaa myös mahdollisia synnytyksessä tapahtuvia vahinkoja sekä äidille että lapselle?',
            image: kysymys3,
            options: [
                'Kyllä, tiedän tämän',
                'Ei, tämä oli uutta tietoa',
            ]
        },
        {
            question: 'Miten tärkeänä pidät sitä, että perheellä on taloudellista turvaa yllättävien terveyshaasteiden varalle jo ennen lapsen syntymää?',
            image: kysymys4,
            options: [
                'Erittäin tärkeänä',
                'Kohtalaisen tärkeänä',
                'Ei niin tärkeänä'
            ]
        },
        {
            question: 'Tiesitkö, että lapsen vakuutus mahdollistaa nopeamman hoitoon pääsyn ja erikoislääkärikäynnit ilman pitkää jonotusta?',
            image: kysymys5,
            options: [
                'Kyllä, tiedän tämän',
                'Ei, tämä oli uutta tietoa'
            ]
        },
        {
            question: 'Kuinka tärkeää sinulle on mielenrauha siitä, että lapsesi hoitokulut ovat katettuina yllättävien tilanteiden varalta?',
            image: kysymys6,
            options: [
                'Erittäin tärkeää',
                'Melko tärkeää',
                'Ei kovin tärkeää'
            ]
        },
        {
            question: 'Tiesitkö, että syntymättömän lapsen vakuutus kattaa myös lapsen hänen kasvaessaan?',
            image: kysymys7,
            options: [
                'Kyllä, tiesin tämän',
                'Ei, tämä oli uutta tietoa'
            ]
        },
        {
            question: 'Mikä merkitsee sinulle eniten, kun valitset vakuutusta syntymättömälle lapsellesi?',
            image: kysymys8,
            options: [
                'Vakuutuksen kattavuus',
                'Vakuutuksen hinta',
                'Korvausprosessin nopeus ja vaivattomuus',
                'Kaikki yllä mainitut'
            ]
        },
    ];

    // Tallenna vastaukset
    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [`question${currentQuestionIndex + 1}`]: option // Tallenna vastaus
        }));

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null); // Resetoi valinta seuraavaa kysymystä varten
            } else {
                onComplete();
            }
        }, 500); // Pieni viive palautteen antamiseksi
    };

    return (
        <div className="content">
            <div className="image-section">
                <Image
                    src={questions[currentQuestionIndex].image}
                    alt="Question Related"
                    className="ultrasound-image"
                />
            </div>
            <div className="question-section">
                <h1>{questions[currentQuestionIndex].question}</h1>
                <div className="options">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <button
                            key={index}
                            className={selectedOption === option ? 'option selected' : 'option'}
                            onClick={() => handleOptionChange(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Footer-teksti sisällön sisällä */}
                <footer className="footer">
                    Powered by Birra Solutions
                </footer>
            </div>
        </div>
    );
}

export default Question;
