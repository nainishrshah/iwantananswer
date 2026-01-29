"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
console.log("ADMIN PAGE LOADED");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("FETCHING QUESTIONS...");

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
        console.log("RAW DATA:", data);


      if (error) {
        console.error(error);
      } else {
        // unanswered = no related answers
      setQuestions(data);

      }

      setLoading(false);
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
  <div>
    <h1>Admin Panel</h1>

    <button
      onClick={() => console.log("CLIENT JS IS RUNNING")}
    >
      Test Client
    </button>

    <h2>Unanswered Questions</h2>

      <h2>Unanswered Questions</h2>

      {questions.length === 0 ? (
        <p>No unanswered questions 🎉</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.id}>{q.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
