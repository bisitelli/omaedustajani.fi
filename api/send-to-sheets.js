// /api/send-to-sheets.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const { surveyType, name, phone, email, answers } = req.body;

    // Check if answers are valid
    if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ message: 'Answers are missing or invalid' });
    }

    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxY2x7c1v9DVpPhiaR-xb041OLVrlDGBxc5S0oq0Hcmkdr5IvOiyI_QxiEbCw2GKzaZZw/exec'; // Replace with your Google Apps Script URL

    try {
        const response = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            surveyType,
            answers,
        }),
        });

    if (response.ok) {
        res.status(200).json({ message: 'Data sent to Google Sheets successfully' });
    } else {
        res.status(500).json({ message: 'Error sending data to Google Sheets' });
    }
    } catch (error) {
        res.status(500).json({ message: 'Error sending data to Google Sheets', error: error.message });
    }
}
