"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function submitQuestion() {
    if (content.length === 0 || content.length > 5000) {
      alert("Question must be between 1 and 5000 characters");
      return;
    }

    await supabase.from("questions").insert({
      content,
      is_anonymous: isAnonymous,
      author_name: isAnonymous ? null : name
    });

    setContent("");
    setName("");
    setMessage("Question submitted successfully!");
  }

  return (
    <main style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>iwantananswer.com</h1>
      <textarea
        placeholder="Ask your question..."
        value={content}
        onChange={e => setContent(e.target.value)}
        maxLength={5000}
        rows={10}
        style={{ width: "100%" }}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
          Ask anonymously
        </label>
      </div>

      {!isAnonymous && (
        <input
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      )}

      <button onClick={submitQuestion}>Submit</button>
      <p>{message}</p>
      <p>💖 Support the Admin — coming soon</p>
    </main>
  );
}
