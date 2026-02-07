import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Detalhes from "./pages/Detalhes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  );
}