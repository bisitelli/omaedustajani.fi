import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, tele, autovakuutus, kotivakuutus, henkilovakuutus, lemmikkivakuutus, selectedCompanies } = req.body;

    // Luo Nodemailer-kuljetin
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Käytetään Gmail-palvelua, voit vaihtaa palveluntarjoajan tarpeesi mukaan
        auth: {
            user: process.env.EMAIL_USER, // Sähköpostitilin käyttäjänimi ympäristömuuttujista
            pass: process.env.EMAIL_PASS, // Sähköpostitilin salasana ympäristömuuttujista
        },
    });

    try {
        // Valmista sähköpostiviesti
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'julius.sciarra@if.fi', // Vaihda tähän oikea vastaanottajan osoite
            subject: 'Yhteydenotto kotisivulta',
            text: `
        Uusi vakuutuskysely:
        Sähköposti: ${email}
        Puhelinnumero: ${tele}
        Vakuutukset:
        Ajoneuvo: ${autovakuutus ? 'Kyllä' : 'Ei'}
        Koti: ${kotivakuutus ? 'Kyllä' : 'Ei'}
        Henkilö: ${henkilovakuutus ? 'Kyllä' : 'Ei'}
        Lemmikki: ${lemmikkivakuutus ? 'Kyllä' : 'Ei'}
        Nykyinen vakuutusyhtiö(t): ${selectedCompanies.join(', ')}
      `,
        };

        // Lähetä sähköposti
        await transporter.sendMail(mailOptions);

        // Palauta onnistumisviesti
        return res.status(200).json({ message: 'Sähköposti lähetetty onnistuneesti' });
    } catch (error) {
        console.error('Virhe sähköpostin lähetyksessä:', error);
        return res.status(500).json({ message: 'Virhe sähköpostin lähetyksessä' });
    }
}
