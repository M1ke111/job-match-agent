import { useState, useEffect } from 'react';
import HistoryDashboard from './HistoryDashboard';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Function to fetch history from Backend
  const fetchHistory = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/resume/history");
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error("Failed to fetch history", error);
    }
  };

  // 2. Load history when the app first opens
  useEffect(() => {
    fetchHistory();
  }, []);

  // 3. Function to handle deletion of a history record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/resume/history/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setHistory(prevHistory => prevHistory.filter(record => record.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete record", error);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !jd) {
      alert("Please provide both a resume and a job description.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd", jd);

    try {
      const response = await fetch("http://localhost:8080/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setReport(data);
      fetchHistory(); // Refresh history table automatically
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", fontFamily: "Arial, sans-serif", color: "#333" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>AI Job Match Agent</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px" }}>
        <section>
          <label><strong>1. Upload Resume (PDF):</strong></label><br/>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf" style={{ marginTop: "10px" }} />
        </section>

        <section>
          <label><strong>2. Paste Job Description:</strong></label><br/>
          <textarea 
            rows="10" 
            style={{ width: "100%", marginTop: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            placeholder="Paste the LinkedIn/Indeed job description here..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
        </section>

        <button 
          onClick={handleUpload} 
          disabled={loading}
          style={{ 
            padding: "12px", 
            cursor: loading ? "not-allowed" : "pointer", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {loading ? "Analyzing Skills..." : "Match My Resume"}
        </button>
      </div>

      {/* Section 1: The Current AI Analysis Result - FIXED COLORS */}
      {report && (
        <div style={{ 
          marginTop: "40px", 
          border: "2px solid #4CAF50", 
          padding: "25px", 
          borderRadius: "8px", 
          backgroundColor: "#ffffff", // Solid white background
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ color: "#1a202c", marginTop: "0" }}>Match Score: {report.matchPercentage}%</h2>
          
          <h3 style={{ color: "#2f855a", marginBottom: "5px" }}>Matching Skills:</h3>
          <p style={{ color: "#4a5568", fontSize: "16px" }}>
            {report.matchingSkills?.join(", ") || "None identified"}
          </p>
          
          <h3 style={{ color: "#c53030", marginBottom: "5px" }}>Missing Skills:</h3>
          <p style={{ color: "#4a5568", fontSize: "16px" }}>
            {report.missingSkills?.join(", ") || "None identified"}
          </p>
          
          <h3 style={{ color: "#2b6cb0", marginBottom: "5px" }}>Coach Recommendation:</h3>
          <p style={{ color: "#2d3748", fontSize: "16px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            {report.recommendation}
          </p>
        </div>
      )}

      {/* Section 2: The History Dashboard (Data from PostgreSQL) */}
      <hr style={{ margin: "60px 0 30px 0", border: "0", borderTop: "2px solid #9b3f3f" }} />
      
      <div style={{ textAlign: "left" }}>
        <HistoryDashboard 
          history={history} 
          onDelete={handleDelete} 
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;