import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function AdminPage() {
  console.log("ADMIN PAGE LOADED (SERVER)");

  const { data: questions, error } = await supabaseAdmin
  .from("questions")
  .select("*")
  .order("created_at", { ascending: false });


  if (error) {
    console.error("Error fetching questions:", error);
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>Admin Panel</h1>

      <h2>Unanswered Questions</h2>

      {!questions || questions.length === 0 ? (
        <p>No unanswered questions 🎉</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.id} style={{ marginBottom: "20px" }}>
              <p>{q.content}</p>

              {/* Buttons intentionally disabled for now */}
              <button disabled style={{ marginRight: "10px" }}>
                ✅ Approve
              </button>

              <button disabled>❌ Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
