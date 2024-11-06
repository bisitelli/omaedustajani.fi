const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const formData = req.body;
  const { surveyType, name, phone, email, answers } = formData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  // Muodosta sähköpostiviestin sisältö eri kyselytyypeille
  let messageText = `Nimi: ${name}\nPuhelin: ${phone}`;
  if (email) {
    messageText += `\nSähköposti: ${email}`;
  }

  if (surveyType === 'Auto') {
    // Auto-kyselyn viesti
    messageText += `\n\nAuto-kyselyn vastaukset:\n`;
    messageText += Object.entries(answers)
      .map(([question, answer]) => `${question}: ${answer}`)
      .join('\n');
    messageText += `\nTarjouksen haluaminen: ${answers.wantsOffer ? 'Kyllä' : 'Ei'}`;
    
  } else if (surveyType === 'Moottoripyörä') {
    // Moottoripyörä-kyselyn viesti
    messageText += `\n\nMoottoripyörä-kyselyn vastaukset:\n`;
    messageText += Object.entries(answers)
      .map(([question, answer]) => `${question}: ${answer}`)
      .join('\n');

  } else if (surveyType === 'Vauvavakuutus') {
    // Vauvavakuutus-kyselyn viesti
    messageText += `\n\nVauvavakuutus-kyselyn vastaukset:\n`;
    messageText += Object.entries(answers)
      .map(([question, answer]) => `${question}: ${answer}`)
      .join('\n');

  } else if (surveyType === 'Vakuutustiedot') {
    // Vakuutustiedot-kyselyn viesti
    messageText += `\n\nVakuutustiedot-kyselyn vastaukset:\n`;
    messageText += Object.entries(answers)
      .map(([question, answer]) => `${question}: ${answer}`)
      .join('\n');
  } else {
    // Muut kyselyt, yleinen viesti
    messageText += `\n\nVastaukset kyselyyn (${surveyType}):\n`;
    messageText += Object.entries(answers)
      .map(([question, answer]) => `${question}: ${answer}`)
      .join('\n');
  }

  const mailOptions = {
    from: email || process.env.AUTH_EMAIL,
    to: 'julius.sciarra@if.fi', // Korvaa omalla sähköpostiosoitteella
    subject: `Tarjouspyyntö - ${surveyType}`,
    text: messageText,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send('Sähköposti lähetetty ' + info.response);
  } catch (error) {
    res.status(500).send(error.toString());
  }
}
