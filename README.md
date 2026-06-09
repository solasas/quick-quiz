# Quiz App

A Next.js quiz application that loads questions from JSON files.

## Features

- Next.js App Router
- Upload and run quizzes from JSON files
- Interactive multiple-choice quiz UI with instant scoring
- JSON validation on upload
- Responsive design with dark theme
- Sample quiz JSON included

## Getting started

Install dependencies and start the dev server:

```zsh
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Using the app

1. Click **Upload & Start Quiz**
2. Select a JSON file with your quiz questions (see format below)
3. Answer the questions and click **Submit quiz**
4. Review your score and correct answers
5. Click **Upload New Quiz** to load another set of questions

## JSON Format

Each quiz must be a JSON array of question objects with this structure:

```json
[
  {
    "question": "What is the capital of France?",
    "options": ["London", "Paris", "Berlin", "Madrid"],
    "correctAnswer": "Paris",
    "explanation": "Paris is the capital and largest city of France."
  }
]
```

### Required fields
- **question** (string): The question text
- **options** (array): Array of 2 or more answer choices
- **correctAnswer** (string): Must exactly match one of the options
- **explanation** (string): Why the answer is correct

A sample quiz is provided in `sample-quiz.json` that you can use as a template.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production server
- `npm run lint` — run Next.js linting

# quick-quiz

