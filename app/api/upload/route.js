export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!file.name.endsWith('.json')) {
      return new Response(
        JSON.stringify({ error: 'File must be a JSON file' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const text = await file.text();
    let questions;

    try {
      questions = JSON.parse(text);
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate the structure of questions
    if (!Array.isArray(questions)) {
      return new Response(
        JSON.stringify({ error: 'JSON must be an array of question objects' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || !Array.isArray(q.options) || !q.correctAnswer || !q.explanation) {
        return new Response(
          JSON.stringify({
            error: `Question ${i + 1} is missing required fields: question, options (array), correctAnswer, explanation`,
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (q.options.length < 2) {
        return new Response(
          JSON.stringify({ error: `Question ${i + 1} must have at least 2 options` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (!q.options.includes(q.correctAnswer)) {
        return new Response(
          JSON.stringify({
            error: `Question ${i + 1}: correctAnswer must be one of the options`,
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, questions, count: questions.length }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Server error: ' + error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

