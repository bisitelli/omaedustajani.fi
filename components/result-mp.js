import React, {useEffect} from 'react';
import '../styles/millainen-mp-olet.css';

function Result({ answers, name, phone, resetTest }) {
  const getResult = () => {
    const resultTypes = ['Synnynnäinen formulakuski', 'Turvallinen matkantekijä', 'Seikkailija', 'Luonnon ystävä'];
    const resultDescription = [
      'Olet nopea ja kunnianhimoinen kuljettaja, joka nauttii vauhdista ja riskinotosta. Voisit hyvinkin sopia formulakisoihin! Ifiltä saat erinomaisen vakuutuksen, joka suojaa sinua ja autoasi, vaikka vauhti kasvaisi.',
      'Sinulle tärkeintä on ympäristöystävällisyys ja modernit ratkaisut. Sähköautosi kaipaa turvaa, ja If tarjoaa vakuutuksen, joka tukee kestävää kehitystä.',
      'Rakastat maastureita ja olet valmis ajamaan kaikissa sääolosuhteissa. Ifin vakuutus suojaa sinua ja autoasi vaikeimmissakin olosuhteissa.',
      'Ajaminen on sinulle keino päästä paikasta A paikkaan B, ja haluat tehdä sen turvallisesti. If tarjoaa vakuutuksen, joka pitää sinut turvassa koko matkan ajan.'
    ];
    const score = Object.values(answers).reduce((total, answer) => {
      if (answer === 'Alle 2 vuotta vanha - uutuuden huumaa!' || answer === 'Kaupungissa tai taajama-alueilla – liikennettä riittää ja välillä tiukkaa parkkitilaa.' || answer === 'Suunnittelen reittini etukäteen ja lähden ajoissa – turvallisuus ennen kaikkea.' || answer === 'Tarkistan auton huolellisesti ja varmistan, että kaikki on kunnossa.' || answer === 'Varmistan, että vakuutukset ovat kunnossa ja korjautan vaurion pikaisesti.' || answer === 'Turvavarusteet, ensiapupakkaus ja työkalut – valmiina kaikkeen.' || answer === 'Hoidan kaiken ammattilaisen kautta – en ota riskejä.' || answer === 'Haluan olla täysin varautunut – kaikenlaiset vahingot on parasta vakuuttaa.' ) return total + 3;
      if (answer === '3-5 vuotta vanha - edelleen hyvässä kunnossa.' || answer === 'Maaseudulla tai pienemmillä teillä – rauhallista, mutta joskus yllätyksiä kuten eläimiä tiellä.' || answer === 'Moottoriteillä tai pitkää matkaa – pitkät ajomatkat ja nopeat väylät.' || answer === 'Pärjäilen, kunhan olen valmistautunut ja reitti on tuttu.' || answer === 'Käyn läpi perusasiat, mutta en liioittele valmisteluja.' || answer === 'Harmittaa, mutta yritän selvitä ilman vakuutusasiaa.' || answer === 'Kauden varusteita, mutta ei mitään ylimääräistä.' || answer === 'Teen pienet korjaukset itse, mutta suuremmat jätän ammattilaisille.' || answer === 'Varaudun isoihin riskeihin, mutta en stressaa liikaa pienistä asioista.') return total + 2;
      if (answer === '6-10 vuotta vanha - luotettava kaveri.' || answer === 'Ajan sekaisin eri paikoissa – ei ole tiettyä ajomaastoa.' || answer === 'En stressaa – ajan rauhassa ruuhkienkin keskellä.' || answer === 'Otan vain välttämättömät tavarat mukaan ja lähden matkaan.' || answer === 'Pieni naarmu ei haittaa – auto kestää sen.' || answer === 'Sekalaisia tavaroita, joita en aina muista edes laittaneeni sinne.' || answer === 'Yritän hoitaa mahdollisimman paljon itse.' || answer === 'Ajattelen, että elämässä sattuu ja tapahtuu, enkä murehdi etukäteen.') return total + 1;
    }, 0);
    
    let resultIndex;
    if (score >= 22) return resultIndex[0];
    else if (score >= 15) resultIndex = 1;
    else if (score >= 8) resultIndex = 2;
    else resultIndex = 3;

    return { type: resultTypes[resultIndex], description: resultDescription[resultIndex]}
  };

  const result = getResult();

  useEffect(() => {
    handleSubmit();
  });

  const handleButtonClick = () => {
    resetTest(); // Nollaa testi ja palaa alkuun
  };

  return (
    <div className='container-result'>
      <h2>Olet {result.type}</h2>
      <p>{result.description}</p>
      <br />
      <button type='submit' className='sulje-testi' onClick={resetTest}>Sulje testi!</button>
    </div>
  );
}

export default Result;
