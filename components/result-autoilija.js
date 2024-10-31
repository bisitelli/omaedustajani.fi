import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../styles/millainen-autoilija-olet.css';
import FormulakuskiImage from '../images/formulakuskiImage.jpg';
import TurvallinenImage from '../images/turvallinenImage.jpg';
import SeikkalijaImage from '../images/seikkailijaImage2.jpg';
import LuonnonYstvavaImage from '../images/luonnonystavaImage.jpg';

function Result({ answers, resetTest }) {
  const [fade, setFade] = useState('fade-in');

  useEffect(() => {
    // Tämä efekti laukaisee fade-in animaation, kun komponentti ladataan
    setFade('fade-in');
  }, []);

  const getResult = () => {
    const resultTypes = [
      'huolellinen kuljettaja!',
      'turvallinen matkantekijä!',
      'seikkailija!',
      'luonnon ystävä!'
    ];

    const resultDescription = [
      'Olet nopea ja kunnianhimoinen kuljettaja, joka nauttii vauhdista ja riskinotosta. Voisit hyvinkin sopia formulakisoihin! Ifiltä saat erinomaisen vakuutuksen, joka suojaa sinua ja autoasi, vaikka vauhti kasvaisi.',
      'Ajaminen on sinulle keino päästä paikasta A paikkaan B, ja haluat tehdä sen turvallisesti. If tarjoaa vakuutuksen, joka pitää sinut turvassa koko matkan ajan.',
      'Rakastat maastureita ja olet valmis ajamaan kaikissa sääolosuhteissa. Ifin vakuutus suojaa sinua ja autoasi vaikeimmissakin olosuhteissa.',
      'Sinulle tärkeintä on ympäristöystävällisyys ja modernit ratkaisut. Sähköautosi kaipaa turvaa, ja If tarjoaa vakuutuksen, joka tukee kestävää kehitystä.'
    ];

    const resultImages = [
      FormulakuskiImage,
      TurvallinenImage,
      SeikkalijaImage,
      LuonnonYstvavaImage
    ];

    const score = Object.values(answers).reduce((total, answer) => {
      if (
        answer === 'Alle 2 vuotta vanha - uutuuden huumaa!' ||
        answer === 'Kaupungissa tai taajama-alueilla – liikennettä riittää ja välillä tiukkaa parkkitilaa.' ||
        answer === 'Suunnittelen reittini etukäteen ja lähden ajoissa – turvallisuus ennen kaikkea.' ||
        answer === 'Tarkistan auton huolellisesti ja varmistan, että kaikki on kunnossa.' ||
        answer === 'Varmistan, että vakuutukset ovat kunnossa ja korjautan vaurion pikaisesti.' ||
        answer === 'Turvavarusteet, ensiapupakkaus ja työkalut – valmiina kaikkeen.' ||
        answer === 'Hoidan kaiken ammattilaisen kautta – en ota riskejä.' ||
        answer === 'Haluan olla täysin varautunut – kaikenlaiset vahingot on parasta vakuuttaa.'
      ) return total + 3;

      if (
        answer === '3-5 vuotta vanha - edelleen hyvässä kunnossa.' ||
        answer === 'Maaseudulla tai pienemmillä teillä – rauhallista, mutta joskus yllätyksiä kuten eläimiä tiellä.' ||
        answer === 'Moottoriteillä tai pitkää matkaa – pitkät ajomatkat ja nopeat väylät.' ||
        answer === 'Pärjäilen, kunhan olen valmistautunut ja reitti on tuttu.' ||
        answer === 'Käyn läpi perusasiat, mutta en liioittele valmisteluja.' ||
        answer === 'Harmittaa, mutta yritän selvitä ilman vakuutusasiaa.' ||
        answer === 'Kauden varusteita, mutta ei mitään ylimääräistä.' ||
        answer === 'Teen pienet korjaukset itse, mutta suuremmat jätän ammattilaisille.' ||
        answer === 'Varaudun isoihin riskeihin, mutta en stressaa liikaa pienistä asioista.'
      ) return total + 2;

      if (
        answer === '6-10 vuotta vanha - luotettava kaveri.' ||
        answer === 'Ajan sekaisin eri paikoissa – ei ole tiettyä ajomaastoa.' ||
        answer === 'En stressaa – ajan rauhassa ruuhkienkin keskellä.' ||
        answer === 'Otan vain välttämättömät tavarat mukaan ja lähden matkaan.' ||
        answer === 'Pieni naarmu ei haittaa – auto kestää sen.' ||
        answer === 'Sekalaisia tavaroita, joita en aina muista edes laittaneeni sinne.' ||
        answer === 'Yritän hoitaa mahdollisimman paljon itse.' ||
        answer === 'Ajattelen, että elämässä sattuu ja tapahtuu, enkä murehdi etukäteen.'
      ) return total + 1;

      return total; // Varmista, että jokaiselle vastaukselle palautetaan total
    }, 0);
    
    let resultIndex;
    if (score >= 12) resultIndex = 0; // Oikea indeksi
    else if (score >= 8) resultIndex = 1; // Oikea indeksi
    else if (score >= 5) resultIndex = 2; // Oikea indeksi
    else resultIndex = 3; // Oikea indeksi

    return {
      type: resultTypes[resultIndex],
      description: resultDescription[resultIndex],
      image: resultImages[resultIndex]
    };
  };

  const result = getResult();

  return (
    <div className={`result-container ${fade}`}>
      <h2>Olet {result.type}</h2>
      <Image src={result.image} alt={result.type} className="result-image" />
      <p>{result.description}</p>
      <button type='submit' className='sulje-testi' onClick={resetTest}>Sulje testi</button>
      <p className='birra-solutions'>Powered by Birra Solutions</p>
    </div>
  );
}

export default Result;
