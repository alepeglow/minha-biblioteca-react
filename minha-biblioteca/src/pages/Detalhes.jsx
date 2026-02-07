import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const API_URL = "http://localhost:3001/books";

export default function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setBook(null);

      try {
        // Busca robusta (evita 404 chato)
        const res = await axios.get(API_URL, { params: { id } });
        const found = Array.isArray(res.data) ? res.data[0] : null;
        setBook(found || null);
      } catch (err) {
        setBook(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleDelete() {
    if (!book) return;

    const ok = window.confirm(`Remover "${book.title}"?`);
    if (!ok) return;

    try {
      setDeleting(true);
      // DELETE real no JSON Server
      await axios.delete(`${API_URL}/${book.id}`);
      navigate("/"); // volta pra Home
    } catch (err) {
      alert("Não foi possível remover. Verifique se a API está rodando.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <Header />

      <main className="container">
        {loading && <p className="muted">Carregando...</p>}

        {!loading && !book && <p className="error">Livro não encontrado.</p>}

        {!loading && book && (
          <section className="detailsCard">
            <div className="detailsCover">
              {book.coverUrl ? (
                <img
                  className="detailsImg"
                  src={book.coverUrl}
                  alt={`Capa do livro ${book.title}`}
                />
              ) : (
                <div className="detailsPlaceholder">
                  <span className="card__placeholderIcon">📕</span>
                  <span>Sem capa</span>
                </div>
              )}
            </div>

            <div className="detailsBody">
              <h1 className="detailsTitle">{book.title}</h1>
              <p className="detailsAuthor">{book.author}</p>

              <div className="detailsMeta">
                <span className="card__year">{book.year}</span>
                <span className={`badge ${statusToClass(book.status)}`}>
                  {book.status}
                </span>
              </div>

              <h2 className="detailsSubtitle">Sinopse</h2>
              <p className="detailsText">{book.description}</p>

              <div className="detailsActions">
                <button className="btn" onClick={() => navigate(-1)}>
                  ← Voltar
                </button>

                <button
                  className="btn btn--danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Removendo..." : "Remover livro"}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

function statusToClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("quero")) return "badge--want";
  if (s.includes("lendo")) return "badge--reading";
  return "badge--done";
}