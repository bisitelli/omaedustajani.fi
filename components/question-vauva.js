import React, { useState } from 'react';
import Image from 'next/image';
import '../styles/vauva-vakuutus.css';

function Question({ setAnswers, onComplete }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const questions = [
        {
            question: 'Onko sinulla tällä hetkellä harkinnassa vakuutuksen ottaminen syntymättömälle lapselle?',
            image: '/images/1.png',
            options: [
                'Kyllä, olen jo ottanut',
                'Kyllä, harkitsen vielä',
                'Ei, en näe tarvetta'
            ]
        },
        {
            question: 'Kuinka tärkeänä pidät, että lapsesi on vakuutettu jo ennen syntymää?',
            image: '/images/2.png',
            options: [
                'Erittäin tärkeänä',
                'Melko tärkeänä',
                'En kovin tärkeänä'
            ]
        },
        {
            question: 'Tiesitkö, että syntymättömän lapsen vakuutus kattaa myös mahdollisia synnytyksessä tapahtuvia vahinkoja sekä äidille että lapselle?',
            image: '/images/3.png',
            options: [
                'Kyllä, tiedän tämän',
                'Ei, tämä oli uutta tietoa',
            ]
        },
        {
            question: 'Miten tärkeänä pidät sitä, että perheellä on taloudellista turvaa yllättävien terveyshaasteiden varalle jo ennen lapsen syntymää?',
            image: '/images/4.png',
            options: [
                'Erittäin tärkeänä',
                'Kohtalaisen tärkeänä',
                'Ei niin tärkeänä'
            ]
        },
        {
            question: 'Tiesitkö, että lapsen vakuutus mahdollistaa nopeamman hoitoon pääsyn ja erikoislääkärikäynnit ilman pitkää jonotusta?',
            image: '/images/5.png',
            options: [
                'Kyllä, tiedän tämän',
                'Ei, tämä oli uutta tietoa'
            ]
        },
        {
            question: 'Kuinka tärkeää sinulle on mielenrauha siitä, että lapsesi hoitokulut ovat katettuina yllättävien tilanteiden varalta?',
            image: '/images/6.png',
            options: [
                'Erittäin tärkeää',
                'Melko tärkeää',
                'Ei kovin tärkeää'
            ]
        },
        {
            question: 'Tiesitkö, että syntymättömän lapsen vakuutus kattaa myös lapsen hänen kasvaessaan?',
            image: '/images/7.png',
            options: [
                'Kyllä, tiesin tämän',
                'Ei, tämä oli uutta tietoa'
            ]
        },
        {
            question: 'Mikä merkitsee sinulle eniten, kun valitset vakuutusta syntymättömälle lapsellesi?',
            image: '/images/8.png',
            options: [
                'Vakuutuksen kattavuus',
                'Vakuutuksen hinta',
                'Korvausprosessin nopeus ja vaivattomuus',
                'Kaikki yllä mainitut'
            ]
        },
    ];

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [`question${currentQuestionIndex + 1}`]: option
        }));

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            } else {
                onComplete();  // Kyselyn valmistuessa kutsutaan onComplete-funktiota
            }
        }, 500);
    };

    return (
        <div className="content">
            <div className="image-section">
                <Image
                    src={questions[currentQuestionIndex].image}
                    alt="Question Related"
                    width={500}
                    height={500}
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

                <footer className="footer">
                    Powered by Birra Solutions
                </footer>
            </div>
        </div>
    );
}

export default Question;
