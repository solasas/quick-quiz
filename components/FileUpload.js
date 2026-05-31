'use client';

import { useState } from 'react';

export default function FileUpload({ onQuestionsLoaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
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

      onQuestionsLoaded(data.questions);
      setFile(null);
    } catch (err) {
      setError('Network error: ' + err.message);
      setUploading(false);
    }
  };

  return (
    <section className="upload-shell">
      <div className="upload-box">
        <h2>Upload Quiz Questions</h2>
        <p className="upload-hint">Upload a JSON file with your quiz questions</p>

        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            disabled={uploading}
            className="file-input"
          />

          {file && <p className="file-name">Selected: {file.name}</p>}

          <button type="submit" className="primary-button" disabled={uploading || !file}>
            {uploading ? 'Uploading...' : 'Upload & Start Quiz'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
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
          ],
          null,
          2
        )}</pre>
      </div>
    </section>
  );
}

