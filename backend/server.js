require("dotenv").config()

const express = require("express")
const cors = require("cors")
const https = require("https")

const app = express()
app.use(cors())
app.use(express.json())

const API_KEY = process.env.GROQ_API_KEY

app.post("/generate", async (req, res) => {
  console.log("📥 Nova requisição recebida!")
  console.log("Dados:", req.body)

  try {
    const { tema, genero, humor, palavras } = req.body

    const prompt = `Você é um compositor profissional brasileiro. Crie uma letra de música completa em português.
Tema: ${tema}
Gênero: ${genero}
Humor: ${humor}
Palavras-chave: ${palavras}

Estruture em:
[Verso 1]
[Refrão]
[Verso 2]
[Ponte]
[Refrão Final]

A música deve ser criativa, emocional e rimada.`

    const body = JSON.stringify({
     model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024
    })

    const options = {
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Length": Buffer.byteLength(body)
      }
    }

    const request = https.request(options, (response) => {
      let data = ""
      response.on("data", chunk => data += chunk)
      response.on("end", () => {
        const json = JSON.parse(data)
        if (json.error) {
          console.error("❌ Erro Groq:", json.error)
          return res.status(500).json({ erro: json.error.message })
        }
        const text = json.choices[0].message.content
        console.log("✅ Letra gerada com sucesso!")
        res.json({ letra: text })
      })
    })

    request.on("error", e => {
      console.error("❌ Erro na requisição:", e)
      res.status(500).json({ erro: e.message })
    })

    request.write(body)
    request.end()

  } catch (error) {
    console.error("❌ Erro:", error)
    res.status(500).json({ erro: error.message })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})