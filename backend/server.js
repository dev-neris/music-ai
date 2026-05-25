require("dotenv").config()

const express = require("express")
const cors = require("cors")
const https = require("https")

const app = express()

app.use(cors())
app.use(express.json())

const API_KEY = process.env.GROQ_API_KEY

// ===============================
// FUNÇÃO PARA CHAMAR A GROQ
// ===============================
function chamarGroq(prompt, res) {
  const body = JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
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

    response.on("data", chunk => {
      data += chunk
    })

    response.on("end", () => {
      try {
        const json = JSON.parse(data)

        if (json.error) {
          console.error("❌ Erro Groq:", json.error)
          return res.status(500).json({
            erro: json.error.message
          })
        }

        const text = json.choices[0].message.content

        res.json({
          letra: text
        })

      } catch (error) {
        console.error("❌ Erro ao processar resposta:", error)
        res.status(500).json({
          erro: error.message
        })
      }
    })
  })

  request.on("error", (e) => {
    console.error("❌ Erro na requisição:", e)

    res.status(500).json({
      erro: e.message
    })
  })

  request.write(body)
  request.end()
}

// ===============================
// ROTA GERAR LETRA
// ===============================
app.post("/generate", async (req, res) => {

  console.log("📥 Nova geração recebida!")

  try {

    const {
      tema,
      genero,
      humor,
      palavras
    } = req.body

    const prompt = `
Você é um compositor profissional brasileiro.

Crie uma letra de música COMPLETA em português.

Tema: ${tema}
Gênero: ${genero}
Humor: ${humor}
Palavras-chave: ${palavras}

Estruture exatamente em:

[Verso 1]

[Refrão]

[Verso 2]

[Ponte]

[Refrão Final]

A letra deve ser:
- Criativa
- Emocional
- Rimada
- Bem estruturada
- Com linguagem natural
`

    chamarGroq(prompt, res)

  } catch (error) {

    console.error("❌ Erro:", error)

    res.status(500).json({
      erro: error.message
    })
  }
})

// ===============================
// ROTA REFINAR LETRA
// ===============================
app.post("/refine", async (req, res) => {

  console.log("✏️ Refinamento solicitado!")

  try {

    const {
      letraAtual,
      pedido,
      genero,
      tema,
      humor
    } = req.body

    const prompt = `
Você é um compositor profissional brasileiro.

O usuário já possui esta letra:

${letraAtual}

Agora faça a seguinte modificação:

${pedido}

IMPORTANTE:
- Preserve o estilo principal da música
- Mantenha coerência
- Continue no gênero ${genero}
- Continue no tema ${tema}
- Continue no humor ${humor}
- Retorne a letra COMPLETA atualizada
`

    chamarGroq(prompt, res)

  } catch (error) {

    console.error("❌ Erro:", error)

    res.status(500).json({
      erro: error.message
    })
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})