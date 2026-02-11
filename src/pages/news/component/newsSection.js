export default function NewsSection({ title, children }) {
  return (
    <section className="news-section">
      <h2 className="news-title">{title}</h2>
      <div className="news-line" />
      {children}
    </section>
  );
}
