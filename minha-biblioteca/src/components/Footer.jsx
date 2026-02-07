import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">Minha Biblioteca</div>

        <div className="footer__center">
          <Link className="footer__link" to="/">Home</Link>
          <Link className="footer__link" to="/cadastro">Cadastro</Link>
        </div>

        <div className="footer__right">© 2026 — Projeto React</div>
      </div>
    </footer>
  );
}