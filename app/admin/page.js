"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("answered", false)
      .order("created_at", { ascending: true });

    if (!error) setQuestions(data);
  }

  async function submitAnswer() {
    await supabase
      .from("questions")
      .update({ answer, answered: true })
      .eq("id", selected.id);

    setSelected(null);
    setAnswer("");
    fetchQuestions();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      {!selected && (
        <>
          <h2>Unanswered Questions</h2>
          {questions.map(q => (
            <div
              key={q.id}
              style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
            >
              <p>{q.question}</p>
              <button onClick={() => setSelected(q)}>Answer</button>
            </div>
          ))}
        </>
      )}

      {selected && (
        <>
          <h2>Answer Question</h2>
          <p><strong>Q:</strong> {selected.question}</p>
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            rows={5}
            style={{ width: "100%" }}
          />
          <br /><br />
          <button onClick={submitAnswer}>Submit Answer</button>
        </>
      )}
    </div>
  );
}
