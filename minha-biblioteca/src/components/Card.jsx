import { Link } from "react-router-dom";

export default function Card({ id, title, author, year, status, description, coverUrl }) {
  return (
    <article className="card">
      <div className="card__cover">
        {coverUrl ? (
          <img className="card__img" src={coverUrl} alt={`Capa do livro ${title}`} />
        ) : (
          <div className="card__placeholder">
            <span className="card__placeholderIcon">📕</span>
            <span>Sem capa</span>
          </div>
        )}
      </div>

      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__author">{author}</p>

        <div className="card__meta">
          <span className="card__year">{year}</span>
          <span className={`badge ${statusToClass(status)}`}>{status}</span>
        </div>

        <p className="card__desc">{description}</p>

        <Link to={`/detalhes/${id}`} className="card__link">
          Ver detalhes →
        </Link>
      </div>
    </article>
  );
}

function statusToClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("quero")) return "badge--want";
  if (s.includes("lendo")) return "badge--reading";
  return "badge--done";
}