export default function HomePage({ sessionUser }) {
  return (
    <section className="page-grid">
      <article className="panel">
        <p className="eyebrow">Home</p>
        <h3>Login successful</h3>
        <p>
          This page is protected and loads only when a logged-in user exists in
          browser storage.
        </p>
      </article>

      <article className="panel stat-grid">
        <div className="stat-card">
          <span>Username</span>
          <strong>{sessionUser?.username}</strong>
        </div>
        <div className="stat-card">
          <span>User ID</span>
          <strong>{sessionUser?.id}</strong>
        </div>
      </article>
    </section>
  );
}

