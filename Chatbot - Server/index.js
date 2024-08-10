const express = require("express");
require("dotenv/config");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/chat", async (req, res) => {
    try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        async function run() {
            const { prompt } = req.body;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            res.status(200).json(text);
        }
        run();
    } catch (error) {
        res.status(400).json({ Error: "Failed to get response!!" });
    }
});

app.listen(3000, () => {
    console.log("App is listning on port 3000!!");
})