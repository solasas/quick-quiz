'use client';

import { useMemo, useState } from 'react';

export default function QuizCard({ questions, onReset }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const score = useMemo(() => {
    return questions.reduce((total, question, index) => {
      const correctAnswers = Array.isArray(question.correctAnswer)
        ? question.correctAnswer
        : [question.correctAnswer];
      const userAnswers = selectedAnswers[index] || [];
      const userAnswersArray = Array.isArray(userAnswers) ? userAnswers : [userAnswers];

      // Check if user selected exactly the correct answers
      const isCorrect =
        userAnswersArray.length === correctAnswers.length &&
        userAnswersArray.every((answer) => correctAnswers.includes(answer)) &&
        correctAnswers.every((answer) => userAnswersArray.includes(answer));

      return isCorrect ? total + 1 : total;
    }, 0);
  }, [questions, selectedAnswers]);

  const isMultipleChoice = (question) => Array.isArray(question.correctAnswer);

  const answerQuestion = (questionIndex, answer) => {
    const question = questions[questionIndex];
    const isMultiple = isMultipleChoice(question);

    if (isMultiple) {
      // Multiple choice: toggle selection
      const currentAnswers = selectedAnswers[questionIndex] || [];
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((a) => a !== answer)
        : [...currentAnswers, answer];

      setSelectedAnswers((current) => ({
        ...current,
        [questionIndex]: updatedAnswers,
      }));
    } else {
      // Single choice: replace selection
      setSelectedAnswers((current) => ({
        ...current,
        [questionIndex]: answer,
      }));
    }
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

  const isQuestionCorrect = (questionIndex) => {
    const question = questions[questionIndex];
    const correctAnswers = Array.isArray(question.correctAnswer)
      ? question.correctAnswer
      : [question.correctAnswer];
    const userAnswers = selectedAnswers[questionIndex] || [];
    const userAnswersArray = Array.isArray(userAnswers) ? userAnswers : [userAnswers];

    return (
      userAnswersArray.length === correctAnswers.length &&
      userAnswersArray.every((answer) => correctAnswers.includes(answer)) &&
      correctAnswers.every((answer) => userAnswersArray.includes(answer))
    );
  };

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswers.hasOwnProperty(currentQuestion);
  const isMultiple = isMultipleChoice(question);
  const correctAnswers = Array.isArray(question.correctAnswer)
    ? question.correctAnswer
    : [question.correctAnswer];
  const userAnswers = selectedAnswers[currentQuestion] || [];
  const userAnswersArray = Array.isArray(userAnswers) ? userAnswers : [userAnswers];

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
                {isMultiple && <span className="multiple-badge">Select all that apply</span>}
              </h3>

              <div className="option-list">
                {question.options.map((option) => {
                  const isSelected = isMultiple
                    ? userAnswersArray.includes(option)
                    : userAnswersArray[0] === option;
                  const isCorrect = correctAnswers.includes(option);
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
                    <strong>✓ Correct answer{correctAnswers.length > 1 ? 's' : ''}:</strong>{' '}
                    {correctAnswers.join(', ')}
                  </p>
                  <p>
                    <strong>Your answer{userAnswersArray.length !== 1 ? 's' : ''}:</strong>{' '}
                    {userAnswersArray.length > 0 ? userAnswersArray.join(', ') : 'Not answered'}
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
              const isAnsweredQuestion = selectedAnswers.hasOwnProperty(index);
              const isCorrect = submitted && isQuestionCorrect(index);
              const isWrong = submitted && isAnsweredQuestion && !isCorrect;
              const isCurrent = currentQuestion === index;

              return (
                <button
                  key={index}
                  type="button"
                  className={`question-number ${isCurrent ? 'current' : ''} ${
                    isAnsweredQuestion ? 'answered' : ''
                  } ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                  onClick={() => goToQuestion(index)}
                  title={`Question ${index + 1}${isAnsweredQuestion ? ' - Answered' : ''}`}
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

