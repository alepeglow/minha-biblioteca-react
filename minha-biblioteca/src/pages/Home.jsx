import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Card from "../components/Card.jsx";

const API_URL = "http://localhost:3001/books";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const res = await axios.get(API_URL);
        setBooks(res.data);
      } catch (e) {
        setError("Não foi possível carregar os livros. Verifique a API.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <h1 className="hero__title">Organize sua coleção</h1>
          <p className="hero__text">Cadastre livros e acompanhe seu status de leitura.</p>
        </section>

        <h2 className="sectionTitle">Seus livros</h2>

        {loading && <p className="muted">Carregando...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <section className="grid">
            {books.map((b) => (
              <Card
                key={b.id}
                id={b.id}
                title={b.title}
                author={b.author}
                year={b.year}
                status={b.status}
                description={b.description}
                coverUrl={b.coverUrl}
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}