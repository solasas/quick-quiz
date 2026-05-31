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
        <p className="eyebrow">Interactive Assessment Platform</p>
        <h1>Quiz Master</h1>
        <p className="hero-copy">Create, upload, and take custom quizzes with intelligent scoring and detailed explanations</p>
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

