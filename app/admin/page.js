"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
console.log("ADMIN PAGE LOADED");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("questions")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };
  const fetchQuestions = async () => {
  const { data, error } = await supabase
    .from("questions")
    .select("id, content, created_at, status")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  } else {
    setQuestions(data);
  }

  setLoading(false);
};

    useEffect(() => {
  fetchQuestions();

  const channel = supabase
    .channel("questions-admin")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "questions",
      },
      () => {
        fetchQuestions();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
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
    <li key={q.id} style={{ marginBottom: "20px" }}>
      <p>{q.content}</p>

      <button
        onClick={() => updateStatus(q.id, "approved")}
        style={{ marginRight: "10px" }}
      >
        ✅ Approve
      </button>

      <button
        onClick={() => updateStatus(q.id, "rejected")}
      >
        ❌ Reject
      </button>
    </li>
  ))}
</ul>

      )}
    </div>
  );
}
