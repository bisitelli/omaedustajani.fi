const nodemailer = require('nodemailer');
require('dotenv').config();

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const formData = req.body;
  const { surveyType, name, phone, email, answers } = formData;

  // Check if answers is valid
  if (!answers || typeof answers !== 'object') {
    return res.status(400).send({ message: 'Answers are missing or invalid' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  // Start building the email content
  let messageText = `Nimi: ${name}\nPuhelin: ${phone}`;
  if (email) {
    messageText += `\nSähköposti: ${email}`;
  }

  // Build survey-specific message text
  if (surveyType === 'Auto') {
    messageText += buildSurveyMessage('Auto-kyselyn', answers);
  } else if (surveyType === 'Moottoripyörä') {
    messageText += buildSurveyMessage('Moottoripyörä-kyselyn', answers);
  } else if (surveyType === 'Vauvavakuutus') {
    messageText += buildSurveyMessage('Vauvavakuutus-kyselyn', answers);
  } else if (surveyType === 'Vakuutustiedot') {
    messageText += buildSurveyMessage('Vakuutustiedot-kyselyn', answers);
  } else {
    messageText += buildSurveyMessage(`Kyselyn (${surveyType})`, answers);
  }

  console.log("Request method:", req.method);

  // Define mail options
  const mailOptions = {
    from: email || process.env.AUTH_EMAIL, // Fallback to AUTH_EMAIL if no email provided
    to: 'julius.sciarra@if.fi', // Replace with your own email address
    subject: `Tarjouspyyntö - ${surveyType}`,
    text: messageText,
  };

  // Send the email and handle success or failure
  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send('Sähköposti lähetetty ' + info.response);
  } catch (error) {
    res.status(500).send(error.toString());
  }
}

// Helper function to build the message text for each survey
function buildSurveyMessage(surveyName, answers) {
  let message = `\n\n${surveyName} vastaukset:\n`;
  // Iterate over the answers and format them
  message += Object.entries(answers)
    .map(([question, answer]) => `${question}: ${answer}`)
    .join('\n');
  // If there's a "wantsOffer" field, append it
  if (answers.wantsOffer !== undefined) {
    message += `\nTarjouksen haluaminen: ${answers.wantsOffer ? 'Kyllä' : 'Ei'}`;
  }
  return message;
}
