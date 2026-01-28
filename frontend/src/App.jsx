import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")

  const handleFileChange = (e) => {
    // Select the first file chosen by the user
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!")
      return
    }

    // Prepare the data to send
    const formData = new FormData()
    formData.append("file", file) // "file" must match the @RequestParam name in Java

    try {
      // Send the request to your Java Backend
      const response = await fetch("http://localhost:8080/api/resume/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const text = await response.text()
        setMessage("Success: " + text)
      } else {
        setMessage("Error: Upload failed.")
      }
    } catch (error) {
      setMessage("Error: Could not connect to backend.")
      console.error(error)
    }
  }

  return (
    <div style={{ padding: "50px" }}>
      <h1>AI Job Match Agent</h1>
      
      <div style={{ border: "2px dashed #ccc", padding: "20px", marginTop: "20px" }}>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
          Upload Resume
        </button>
      </div>

      {message && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>}
    </div>
  )
}

export default App