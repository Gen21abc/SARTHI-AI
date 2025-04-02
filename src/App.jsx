
/*import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [fileContents, setFileContents] = useState([]);
  const [answer, setAnswer] = useState("");
  const [selectedFiles, setSelectedFiles] = useState("");

  // Function to handle file upload (User cannot see the file content)
  function handleFileUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 3) {
      alert("You can upload up to 3 files only.");
      return;
    }

    const readers = [];
    const contentArray = [];
    const fileNames = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      readers.push(reader);
      fileNames.push(files[i].name); // Store file names for display

      reader.onload = (e) => {
        contentArray.push(`File ${i + 1} (${files[i].name}):\n${e.target.result}\n\n`);

        // Wait until all files are read
        if (contentArray.length === files.length) {
          setFileContents(contentArray);
          setSelectedFiles(fileNames.join(", ")); // Show selected file names
          console.log("Uploaded File Content (Developer Only):", contentArray);
        }
      };

      reader.readAsText(files[i]); // Read file as text
    }
  }

  async function generateAnswer() {
    if (!question.trim()) {
      setAnswer("Please enter a question.");
      return;
    }
    if (fileContents.length === 0) {
      setAnswer("Please upload at least one file.");
      return;
    }

    setAnswer("Loading...");
    
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCFUweWSM2mWLkLsoNNCZdXIghmKLltI2o`,
        {
          contents: [
            {
              parts: [
                {
                  text: `File Contents:\n${fileContents.join("\n")}\nQuestion: ${question}`
                }
              ]
            }
          ]
        }
      );

      console.log(response.data); // Debugging: Check response structure

      const generatedAnswer =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";
      setAnswer(generatedAnswer);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Failed to generate an answer.");
    }
  }

  return (
    <>
      <h1>MR PlaceBuddy</h1>

      
      <label className="file-upload-label">
        <input type="file" accept=".xlsx,.csv" multiple onChange={handleFileUpload} hidden />
        <span className="file-upload-button">Placement Query</span>
      </label>
      <br />
      

      
      <div className="chat-box">
      <textarea className="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="5"
        placeholder="Type your question here..."
      />
      </div>
      <button className="chat-btn"onClick={generateAnswer}>Generate Answer</button>
      
      <div className="chat-container">
        <p className="message">{answer}</p>
      </div>
    </>
  );
}

export default App;*/

/*import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [fileContents, setFileContents] = useState([]);
  const [answer, setAnswer] = useState("");
  const [selectedFiles, setSelectedFiles] = useState("");

  // Function to handle file upload (User cannot see the file content)
  function handleFileUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 3) {
      alert("You can upload up to 3 files only.");
      return;
    }

    const readers = [];
    const contentArray = [];
    const fileNames = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      readers.push(reader);
      fileNames.push(files[i].name); // Store file names for display

      reader.onload = (e) => {
        contentArray.push(`File ${i + 1} (${files[i].name}):\n${e.target.result}\n\n`);

        // Wait until all files are read
        if (contentArray.length === files.length) {
          setFileContents(contentArray);
          setSelectedFiles(fileNames.join(", ")); // Show selected file names
          console.log("Uploaded File Content (Developer Only):", contentArray);
        }
      };

      reader.readAsText(files[i]); // Read file as text
    }
  }

  async function generateAnswer() {
    if (!question.trim()) {
      setAnswer("Please enter a question.");
      return;
    }

    setAnswer("Loading...");

    // Construct the input text for Gemini
    let inputText = question; // Default case: Query without file
    if (fileContents.length > 0) {
      inputText = `File Contents:\n${fileContents.join("\n")}\n\nQuestion: ${question}`;
    }

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCFUweWSM2mWLkLsoNNCZdXIghmKLltI2o`,
        {
          contents: [
            {
              parts: [
                { text: inputText }
              ]
            }
          ]
        }
      );

      console.log(response.data); // Debugging: Check response structure

      const generatedAnswer =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";
      setAnswer(generatedAnswer);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Failed to generate an answer.");
    }
  }

  return (
    <>
      <h1>MR PlaceBuddy</h1>

     
      <label className="file-upload-label">
        <input type="file" accept=".xlsx,.csv" multiple onChange={handleFileUpload} hidden />
        <span className="file-upload-button">Placement Query</span>
      </label>
      <br />
      
      
      <div className="chat-box">
      <textarea className="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="5"
        placeholder="Type your question here..."
      />
      </div>
      <button className="chat-btn" onClick={generateAnswer}>Generate Answer</button>
      
      <div className="chat-container">
        <p className="message">{answer}</p>
      </div>
    </>
  );
}

export default App;*/
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { GoogleGenAI } from "@google/genai";

function App() {
  const [question, setQuestion] = useState("");
  const [fileContents, setFileContents] = useState([]);
  const [answer, setAnswer] = useState("");
  const [selectedFiles, setSelectedFiles] = useState("");

  /* chnages started*/
  useEffect(() => {
    const loadFile = async () => {
      try {
        const response = await fetch("/data.csv"); // Change this to your file path
        const text = await response.text();
        console.log(text)
        setFileContents([`File 1 (data.txt):\n${text}\n\n`]); // Adjust the file name as needed
        setSelectedFiles("data.txt"); // Update the selected files state
      } catch (error) {
        console.error("Error loading file:", error);
      }
    };

    loadFile();
  }, []);/*changes end */

  function handleFileUpload(event) {
    const files = event.target.files;
    // const files =
    if (!files || files.length === 0) return;

    if (files.length > 3) {
      alert("You can upload up to 3 files only.");
      return;
    }

    const readers = [];
    const contentArray = [];
    const fileNames = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      readers.push(reader);
      fileNames.push(files[i].name);

      reader.onload = (e) => {
        contentArray.push(`File ${i + 1} (${files[i].name}):\n${e.target.result}\n\n`);
        console.log(contentArray[0])
        if (contentArray.length === files.length) {
          setFileContents(contentArray);
          setSelectedFiles(fileNames.join(", "));
          console.log("Uploaded File Content (Developer Only):11", contentArray);
        }
      };

      reader.readAsText(files[i]);
    }
  }

  async function generateAnswer() {
    if (!question.trim()) {
      setAnswer("Please enter a question.");
      return;
    }

    setAnswer("Loading...");

    let inputText = question;
    if (fileContents.length > 0) {
      inputText = `File Contents:\n${fileContents.join("\n")}\n\nQuestion: ${question}`;
    }

    try {
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBGd0uip06V6s7bAqjqeOc2AsFQQoVJhCk`,
        {
          contents: [
            { parts: [
              { 
                text: inputText 
              }
            ] 
          }
        ]
        }
        
      );

      console.log(response.data);

      const generatedAnswer =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";
      setAnswer(generatedAnswer);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Failed to generate an answer.");
    }
  }

  return (
    <div className="chat-container">
      <h1 style={{'color':'black'}}>MR PlaceBuddy</h1>

      {/* File Upload Button */}
      {/* <label className="file-upload-label">
        <input type="file" accept=".xlsx,.csv" multiple onChange={handleFileUpload} hidden disabled/>
        <span className="file-upload-button">Upload Placement Data</span>
      </label> */}
      
      {/* User Input Section */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="3"
        placeholder="Type your question here..."
        className="chat-box"
      />

      <button className="chat-btn" onClick={generateAnswer}>Generate Answer</button>

      {/* Answer Section */}
      {answer && (
        <div className="answer-container">
          <p><b>Answer:</b></p>
  {answer.includes(",") ? (
    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
      {answer}
    </pre>
  ) : (
    <p>{answer}</p>
  )}
        </div>
      )}
    </div>
  );
}

export default App;

