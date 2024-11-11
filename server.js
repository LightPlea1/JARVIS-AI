require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is your OpenAI API key
});

// Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
    const userInput = req.body.prompt;

    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003', // or another model of your choice
            prompt: userInput,
            max_tokens: 100,
        });

        // Send the response from OpenAI back to the client
        res.json({ reply: response.choices[0].text.trim() });
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        res.status(500).send('Something went wrong.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
