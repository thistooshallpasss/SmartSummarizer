// In SmartSummarizer/frontend/src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [summaryType, setSummaryType] = useState('extractive');
  const [sentenceCount, setSentenceCount] = useState(3); // Add this state
  const [copySuccess, setCopySuccess] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // Add this state

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setInputText(''); // Clear text area when a file is selected
    }
  };

  const handleSummarize = async () => {
    // Check for file first, then text
    if (!selectedFile && !inputText.trim()) {
      setError('Please enter text or upload a file to summarize.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      let response;
      if (selectedFile) {
        // --- File Upload Logic ---
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('summary_type', summaryType);
        formData.append('sentence_count', sentenceCount);

        response = await axios.post('http://127.0.0.1:8000/summarize-file', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

      } else {
        // --- Original Text Logic ---
        response = await axios.post('http://127.0.0.1:8000/summarize', {
          text: inputText,
          type: summaryType,
          sentence_count: sentenceCount,
        });
      }
      setSummary(response.data.summary);
    } catch (err) {
      setError('An error occurred while summarizing. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return; // Don't do anything if there's no summary

    navigator.clipboard.writeText(summary).then(() => {
      // On success
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000); // Message disappears after 2 seconds
    }, (err) => {
      // On failure
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 SmartSummarizer</h1>
        <p>Your intelligent text summarization assistant</p>
      </header>
      <main>
        <div className="input-section">
          {/* --- TEXT AREA --- */}
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (selectedFile) setSelectedFile(null); // Clear file when text is typed
            }}
            placeholder="Paste your article... or upload a file below"
            rows="12"
          />

          {/* --- FILE UPLOAD SECTION --- */}
          <div className="file-upload-container">
            <label htmlFor="file-upload" className="file-upload-label">
              Choose File (.txt, .pdf)
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".txt,.pdf"
              onChange={handleFileChange}
            />
            {selectedFile && <span className="file-name">{selectedFile.name}</span>}
          </div>

          {/* --- WORD LIMIT NOTICE --- */}
          <p className="word-limit-notice">
            Note: For best results, please limit input to ~1000 words.
          </p>

          {/* --- THIS IS THE PART THAT WAS LIKELY MISSING --- */}
          <div className="controls">
            <select
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value)}
            >
              <option value="extractive">Extractive Summary</option>
              <option value="abstractive">Abstractive Summary</option>
            </select>

            {summaryType === 'extractive' && (
              <div className="sentence-control">
                <label htmlFor="sentenceCount">Sentences:</label>
                <input
                  type="number"
                  id="sentenceCount"
                  value={sentenceCount}
                  onChange={(e) => setSentenceCount(Number(e.target.value))}
                  min="1"
                  max="20"
                />
              </div>
            )}

            <button onClick={handleSummarize} disabled={isLoading}>
              {isLoading ? 'Summarizing...' : 'Summarize'}
            </button>
          </div>
        </div>

        <div className="output-section">
          {/* This new header will contain both the title and the copy button */}
          <div className="summary-header">
            <h2>Summary</h2>
            {/* This block adds the copy button, which only appears when a summary exists */}
            {summary && (
              <div className="copy-container">
                <button onClick={handleCopy} className="copy-button">Copy</button>
                {copySuccess && <span className="copy-success">{copySuccess}</span>}
              </div>
            )}
          </div>

          {/* The rest of the output section remains the same */}
          {isLoading && <p className="loading">Generating your summary, please wait...</p>}
          {error && <p className="error">{error}</p>}
          {summary && (
            <div className="summary-content">
              <p>{summary}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;