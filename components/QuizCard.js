'use client';

import { useMemo, useState } from 'react';

export default function QuizCard({ questions, onReset }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
    setCurrentQuestion(0);
    onReset?.();
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswers.hasOwnProperty(currentQuestion);

  return (
    <section className="quiz-container">
      <div className="quiz-main">
        <div className="quiz-shell">
          <div className="quiz-header">
            <div>
              <p className="eyebrow">Assessment</p>
              <h2>{submitted ? 'Quiz Complete' : 'Answer all questions carefully'}</h2>
              <p className="question-progress">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            {submitted && (
              <div className="score-card" aria-live="polite">
                <span>Your Score</span>
                <strong>
                  {score}/{questions.length}
                </strong>
              </div>
            )}
          </div>

          <div className="question-list">
            <article className="question-card">
              <h3>
                {currentQuestion + 1}. {question.question}
              </h3>

              <div className="option-list">
                {question.options.map((option) => {
                  const isSelected = selectedAnswers[currentQuestion] === option;
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
                      onClick={() => answerQuestion(currentQuestion, option)}
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
          </div>

          <div className="quiz-actions">
            <button 
              type="button" 
              className="secondary-button" 
              onClick={goToPrevious}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>
            
            {!submitted ? (
              <button type="button" className="primary-button" onClick={() => setSubmitted(true)}>
                ✓ Submit Answers
              </button>
            ) : null}

            <button 
              type="button" 
              className="secondary-button" 
              onClick={goToNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next →
            </button>

            <button type="button" className="secondary-button" onClick={resetQuiz}>
              ↻ New Quiz
            </button>
          </div>
        </div>
      </div>

      <aside className="quiz-sidebar">
        <div className="questions-panel">
          <h3 className="panel-title">Questions</h3>
          <div className="questions-grid">
            {questions.map((_, index) => {
              const isAnswered = selectedAnswers.hasOwnProperty(index);
              const isCorrect = submitted && selectedAnswers[index] === questions[index].correctAnswer;
              const isWrong = submitted && isAnswered && !isCorrect;
              const isCurrent = currentQuestion === index;

              return (
                <button
                  key={index}
                  type="button"
                  className={`question-number ${isCurrent ? 'current' : ''} ${
                    isAnswered ? 'answered' : ''
                  } ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                  onClick={() => goToQuestion(index)}
                  title={`Question ${index + 1}${isAnswered ? ' - Answered' : ''}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {!submitted && (
            <div className="answers-summary">
              <p className="summary-text">
                <span className="summary-number">{Object.keys(selectedAnswers).length}</span>
                <span className="summary-label">of {questions.length} answered</span>
              </p>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}

