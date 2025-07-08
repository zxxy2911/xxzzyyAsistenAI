require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Deteksi perintah download video YouTube
  if (userMessage.startsWith("download ")) {
    const url = userMessage.split(" ")[1];
    if (ytdl.validateURL(url)) {
      return res.json({ response: "🔗 Video dikenali, link download: " + url });
    } else {
      return res.json({ response: "❌ URL tidak valid atau tidak didukung." });
    }
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });
    res.json({ response: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ response: "❌ Gagal mengambil respon dari AI" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`xxzzyyAI berjalan di http://localhost:${PORT}`));