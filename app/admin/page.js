"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select(`
          id,
          content,
          created_at,
          answers ( id )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching questions:", error);
      } else {
        // show only unanswered questions
        const unanswered = data.filter(
          (q) => !q.answers || q.answers.length === 0
        );
        setQuestions(unanswered);
      }

      setLoading(false);
    };

    fetchQuestions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <h2>Unanswered Questions</h2>

      {loading && <p>Loading...</p>}

      {!loading && questions.length === 0 && (
        <p>No unanswered questions 🎉</p>
      )}

      {!loading &&
        questions.map((q) => (
          <div
            key={q.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><strong>Question:</strong> {q.content}</p>
            <p style={{ fontSize: "12px", color: "#666" }}>
              Asked on {new Date(q.created_at).toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  );
}
