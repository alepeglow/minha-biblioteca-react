import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const API_URL = "http://localhost:3001/books";

const schema = yup.object({
  title: yup.string().required("Título é obrigatório").min(2, "Mínimo 2 caracteres"),
  author: yup.string().required("Autor é obrigatório").min(2, "Mínimo 2 caracteres"),
  year: yup
    .number()
    .typeError("Ano deve ser um número")
    .required("Ano é obrigatório")
    .min(1000, "Ano inválido")
    .max(new Date().getFullYear(), "Ano não pode ser no futuro"),
  status: yup.string().required("Status é obrigatório"),
  coverUrl: yup
    .string()
    .url("Informe uma URL válida (começando com http/https)")
    .nullable()
    .transform((v) => (v === "" ? null : v)),
  description: yup
    .string()
    .required("Sinopse é obrigatória")
    .min(10, "Escreva pelo menos 10 caracteres")
});

export default function Cadastro() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      author: "",
      year: "",
      status: "",
      coverUrl: "",
      description: ""
    }
  });

  async function onSubmit(data) {
    try {
      setServerError("");
      setSuccess("");

      // coverUrl pode vir null (ok)
      const payload = {
        title: data.title,
        author: data.author,
        year: Number(data.year),
        status: data.status,
        coverUrl: data.coverUrl || "",
        description: data.description
      };

      await axios.post(API_URL, payload);

      setSuccess("Livro cadastrado com sucesso!");
      reset();

      // volta pra home depois de cadastrar
      setTimeout(() => navigate("/"), 700);
    } catch (e) {
      setServerError("Não foi possível cadastrar. Verifique se a API está rodando.");
    }
  }

  return (
    <>
      <Header />

      <main className="container">
        <section className="formCard">
          <h1 className="formTitle">Cadastrar novo livro</h1>
          <p className="formSubtitle">
            Adicione um livro à sua biblioteca e acompanhe o status de leitura.
          </p>

          {serverError && <p className="error">{serverError}</p>}
          {success && <p className="success">{success}</p>}

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Título do livro *</label>
              <input className="input" placeholder="Digite o título do livro" {...register("title")} />
              {errors.title && <span className="fieldError">{errors.title.message}</span>}
            </div>

            <div className="field">
              <label className="label">Autor *</label>
              <input className="input" placeholder="Digite o nome do autor" {...register("author")} />
              {errors.author && <span className="fieldError">{errors.author.message}</span>}
            </div>

            <div className="field">
              <label className="label">Ano *</label>
              <input className="input" placeholder="Ex: 2000" {...register("year")} />
              {errors.year && <span className="fieldError">{errors.year.message}</span>}
            </div>

            <div className="field">
              <label className="label">Status *</label>
              <select className="input" {...register("status")}>
                <option value="">Selecione o status</option>
                <option value="Quero ler">Quero ler</option>
                <option value="Lendo">Lendo</option>
                <option value="Lido">Lido</option>
              </select>
              {errors.status && <span className="fieldError">{errors.status.message}</span>}
            </div>

            <div className="field">
              <label className="label">Link da capa (URL)</label>
              <input className="input" placeholder="https://..." {...register("coverUrl")} />
              {errors.coverUrl && <span className="fieldError">{errors.coverUrl.message}</span>}
            </div>

            <div className="field">
              <label className="label">Descrição / Sinopse *</label>
              <textarea
                className="textarea"
                placeholder="Digite uma breve descrição ou sinopse do livro"
                rows={5}
                {...register("description")}
              />
              {errors.description && <span className="fieldError">{errors.description.message}</span>}
            </div>

            <div className="formActions">
              <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </button>
              <button className="btn" type="button" onClick={() => navigate("/")}>
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}