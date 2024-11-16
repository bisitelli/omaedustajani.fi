const nodemailer = require('nodemailer');
require('dotenv').config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, tele, autovakuutus, kotivakuutus, henkilovakuutus, lemmikkivakuutus, yhtiot } = req.body;

        let transporter = nodemailer.createTransport({
            service: 'gmail', // tai muu sähköpostipalvelu
            auth: {
                user: process.env.EMAIL, // Gmail-tili tai muu tili
                pass: process.env.PASSWORD, // Oikea salasana tai sovelluksen salasana
            },
        });

        const mailOptions = {
            from: email || process.env.AUTH_EMAIL, // Lähettäjän sähköposti (voi olla myös oma sähköpostisi)
            to: 'julius.sciarra@if.fi', // Vastaanottajan sähköposti
            subject: 'Tarjouspyyntö',
            text: `Sähköposti: ${email}\nPuhelinnumero: ${tele}\nVakuutukset: ${autovakuutus}, ${kotivakuutus}, ${henkilovakuutus}, ${lemmikkivakuutus}\nYhtiöt: ${yhtiot}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).send('Viesti lähetetty onnistuneesti!');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Virhe sähköpostin lähetyksessä');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
