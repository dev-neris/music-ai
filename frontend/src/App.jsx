import { useState } from "react"
import axios from "axios"

function App() {
  const [tema, setTema] = useState("")
  const [genero, setGenero] = useState("")
  const [humor, setHumor] = useState("")
  const [palavras, setPalavras] = useState("")
  const [letra, setLetra] = useState("")
  const [loading, setLoading] = useState(false)

  const gerarLetra = async () => {
    try {
      setLoading(true)

      // Ajustado para localhost para evitar problemas de CORS
      const response = await axios.post(
        "http://localhost:3000/generate",
        {
          tema,
          genero,
          humor,
          palavras
        }
      )

      setLetra(response.data.letra)

    } catch (error) {
      console.log(error)
      alert("Erro ao gerar letra")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        🎵 Gerador de Letras IA
      </h1>

      <div style={styles.card}>
        <input
          style={styles.input}
          type="text"
          placeholder="Tema da música"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        />

        <select
          style={styles.input}
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          <option value="">Selecione o gênero</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Rap">Rap</option>
          <option value="Sertanejo">Sertanejo</option>
          <option value="Eletrônica">Eletrônica</option>
        </select>

        <select
          style={styles.input}
          value={humor}
          onChange={(e) => setHumor(e.target.value)}
        >
          <option value="">Selecione o humor</option>
          <option value="Alegre">Alegre</option>
          <option value="Triste">Triste</option>
          <option value="Motivacional">Motivacional</option>
          <option value="Romântico">Romântico</option>
        </select>

        <textarea
          style={styles.textarea}
          placeholder="Palavras-chave"
          value={palavras}
          onChange={(e) => setPalavras(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={gerarLetra}
          disabled={loading}
        >
          {loading ? "Gerando..." : "Gerar Letra"}
        </button>
      </div>

      {letra && (
        <div style={styles.resultado}>
          <h2>🎶 Letra Gerada</h2>
          <pre style={styles.pre}>
            {letra}
          </pre>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
    padding: "40px",
    fontFamily: "Arial"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px"
  },
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#000"
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    minHeight: "100px",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#000"
  },
  button: {
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#7c3aed",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  },
  resultado: {
    maxWidth: "800px",
    margin: "40px auto",
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #333"
  },
  pre: {
    whiteSpace: "pre-wrap",
    fontSize: "16px",
    lineHeight: "1.6",
    fontFamily: "inherit"
  }
}

export default App