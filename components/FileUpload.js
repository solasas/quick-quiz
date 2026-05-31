'use client';

import { useState } from 'react';

export default function FileUpload({ onQuestionsLoaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a JSON file');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Upload failed');
        setUploading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onQuestionsLoaded(data.questions);
        setFile(null);
        setSuccess(false);
      }, 600);
    } catch (err) {
      setError('Network error: ' + err.message);
      setUploading(false);
    }
  };

  return (
    <section className="upload-shell">
      <div className="upload-box">
        <h2>Upload Quiz</h2>
        <p className="upload-hint">Select your quiz JSON file to get started</p>

        <form onSubmit={handleSubmit} className="upload-form">
          <label htmlFor="quiz-file" style={{ cursor: 'pointer' }}>
            <input
              id="quiz-file"
              type="file"
              accept=".json"
              onChange={handleFileChange}
              disabled={uploading}
              className="file-input"
              style={{ display: 'none' }}
            />
            <div
              className="file-input"
              onClick={() => document.getElementById('quiz-file').click()}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                display: 'block',
              }}
            >
              {file ? `Selected: ${file.name}` : 'Click to select JSON file or drag & drop'}
            </div>
          </label>

          <button type="submit" className="primary-button" disabled={uploading || !file}>
            {uploading ? 'Uploading...' : 'Start Quiz'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
        {success && <div style={{ color: 'var(--success)', fontWeight: 500 }}>Loaded successfully!</div>}
      </div>

      <div className="example-box">
        <h3>JSON Format Example</h3>
        <pre>{JSON.stringify(
          [
            {
              question: 'What is 2 + 2?',
              options: ['3', '4', '5', '6'],
              correctAnswer: '4',
              explanation: 'Basic arithmetic: 2 + 2 equals 4.',
            },
            {
              question: 'Which are primary colors?',
              options: ['Red', 'Green', 'Blue', 'Yellow'],
              correctAnswer: ['Red', 'Blue', 'Yellow'],
              explanation: 'Primary colors: Red, Blue, Yellow.',
            },
          ],
          null,
          2
        )}</pre>
      </div>
    </section>
  );
}
