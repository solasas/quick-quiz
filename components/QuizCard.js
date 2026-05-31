'use client';

import { useMemo, useState } from 'react';

export default function QuizCard({ questions, onReset }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    return questions.reduce((total, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? total + 1 : total;
    }, 0);
  }, [questions, selectedAnswers]);

  const answerQuestion = (questionIndex, answer) => {
    setSelectedAnswers((current) => ({
      ...current,
      [questionIndex]: answer,
    }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    onReset?.();
  };

  return (
    <section className="quiz-shell">
      <div className="quiz-header">
        <div>
          <p className="eyebrow">📚 Assessment</p>
          <h2>Answer all questions carefully</h2>
        </div>
        <div className="score-card" aria-live="polite">
          <span>Score</span>
          <strong>
            {score}/{questions.length}
          </strong>
        </div>
      </div>

      <div className="question-list">
        {questions.map((question, questionIndex) => (
          <article className="question-card" key={question.question}>
            <h3>
              {questionIndex + 1}. {question.question}
            </h3>

            <div className="option-list">
              {question.options.map((option) => {
                const isSelected = selectedAnswers[questionIndex] === option;
                const isCorrect = option === question.correctAnswer;
                const showCorrectState = submitted && isCorrect;
                const showWrongState = submitted && isSelected && !isCorrect;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`option-button ${isSelected ? 'selected' : ''} ${
                      showCorrectState ? 'correct' : ''
                    } ${showWrongState ? 'wrong' : ''}`}
                    onClick={() => answerQuestion(questionIndex, option)}
                    disabled={submitted}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {submitted ? (
              <div className="explanation-box">
                <p>
                  <strong>✓ Correct answer:</strong> {question.correctAnswer}
                </p>
                <p>{question.explanation}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="quiz-actions">
        <button type="button" className="primary-button" onClick={() => setSubmitted(true)}>
          ✓ Submit Answers
        </button>
        <button type="button" className="secondary-button" onClick={resetQuiz}>
          ↻ New Quiz
        </button>
      </div>
    </section>
  );
}

