export default async function AdminPage() {
  console.log("ADMIN PAGE LOADED (SERVER)");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/questions`,
    { cache: "no-store" }
  );

  const questions = await res.json();

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
