export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const res = await fetch('/api/admin/questions', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch questions');
  }

  const questions = await res.json();

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin</h1>

      {questions.length === 0 && <p>No questions found.</p>}

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: 16 }}>
          <p><strong>Question:</strong> {q.content}</p>
          <p>Status: {q.status}</p>
          <hr />
        </div>
      ))}
    </main>
  );
}
