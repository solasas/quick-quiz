'use client';

import { useState } from 'react';
import QuizCard from '../components/QuizCard';
import FileUpload from '../components/FileUpload';

export default function HomePage() {
  const [questions, setQuestions] = useState(null);

  const handleReset = () => {
    setQuestions(null);
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Quiz App</p>
        <h1>Upload Your Questions</h1>
        <p className="hero-copy">Load a JSON file and take the quiz</p>
      </section>

      {!questions ? (
        <FileUpload onQuestionsLoaded={setQuestions} />
      ) : (
        <>
          <QuizCard questions={questions} onReset={handleReset} />
        </>
      )}
    </main>
  );
}

