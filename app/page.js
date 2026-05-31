import QuizCard from '../components/QuizCard';
import { questions, quizDescription, quizTitle } from '../lib/quizData';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Next.js quiz starter</p>
        <h1>{quizTitle}</h1>
        <p className="hero-copy">{quizDescription}</p>
      </section>

      <QuizCard questions={questions} />
    </main>
  );
}

