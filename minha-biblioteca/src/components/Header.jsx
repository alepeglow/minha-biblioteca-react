import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="brand">
          <span className="brand__icon">📘</span>
          <span className="brand__text">Minha Biblioteca</span>
        </Link>

        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}>
            Home
          </NavLink>
          <NavLink to="/cadastro" className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}>
            Cadastro
          </NavLink>

          <Link to="/cadastro" className="btn btn--primary">
            + Novo Livro
          </Link>
        </nav>
      </div>
    </header>
  );
}