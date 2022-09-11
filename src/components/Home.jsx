import React from "react";

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC4-Vuc6Y5Wr8Po2JTJphKZj9o8xaegnF0",
  authDomain: "project-unig.firebaseapp.com",
  projectId: "project-unig",
});

function Home() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('Administração');
  const [tipoSolicitacao, setTipoSolicitacao] = useState('Sugestão');
  const [date] = useState(`${new Date().toLocaleDateString('pt-br')} | ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
  const [descricao, setDescricao] = useState('');

  const [controlador, setControlador] = useState(null);

  const db = getFirestore(firebaseApp);
  const solicitacaoCollectionRef = collection(db, 'solicitacoes');

  async function criarSolicitacao(event) {
    event.preventDefault();
    setControlador(1);

    const solicitacao = await addDoc(solicitacaoCollectionRef, {
      nome,
      email,
      matricula,
      curso,
      tipoSolicitacao,
      date,
      descricao,
    });
    console.log(solicitacao);
  }

  function infoEnvio() {
    function gerarProtocolo() {
      return Math.random() * (10000 - 1000) + 1000;
    }

    if (tipoSolicitacao === 'Sugestão') {
      return {
        class: 'alert alert-success p-2',
        time: '3',
        tipo: 'sugestão',
        protocolo: gerarProtocolo(),
      }
    }
    return {
      class: 'alert alert-warning p-2',
      time: '2',
      tipo: 'reclamação',
      protocolo: gerarProtocolo(),
    }
  }

  return (
    <div className="container text-start bg-light p-3">
      <h1>Suporte Universitário</h1>

      <p>Olá, seja bem-vindo à nossa página de suporte! Para abrir uma solicitação preencha o formulário abaixo: </p>

      <form className="form">
        {controlador &&
          <div className={infoEnvio().class}>
            <h3>Solicitação enviada com sucesso!</h3>
            <p>O número do seu protocolo é: {infoEnvio().protocolo}</p>
            <p>A sua <strong>{infoEnvio().tipo}</strong> será respondida em {infoEnvio().time} dias.</p>
          </div>
        }
        <p><label htmlFor="nome" className="form-label">Nome:</label><br />
          <input
            type="text"
            value={nome}
            id="nome"
            onChange={(e) => setNome(e.target.value)}
            className="form-control"
            required
          /></p>

        <p><label htmlFor="email">E-mail:</label><br />
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          /></p>

        <p><label htmlFor="">Matrícula </label> <br />
          <input
            type="number"
            value={matricula}
            id="nome"
            onChange={(e) => setMatricula(parseInt(e.target.value))}
            className="form-control"
            required
          /></p>

        <p><label htmlFor="" >Curso:</label> <br />
          <select class="form-select" onChange={(e) => setCurso(e.target.value)}>
            <option value='Administração'>Administração</option>
            <option value='Análise de Sistemas'>Análise de Sistemas</option>
            <option value='Biologia'>Ciências Biológicas</option>
            <option value='Engenharia'>Engenharia</option>
          </select></p>

        <fieldset>
          <legend>Tipo de Solicitação: </legend>
          <label htmlFor="reclamacao" className="me-2">Reclamação: </label>
          <input
            type="radio"
            id="reclamacao"
            value="Reclamação"
            onChange={() => setTipoSolicitacao('Reclamação')}
            name="tipo-solicitacao"
            className="form-check-input me-5"
          />

          <label htmlFor="sugestao" className="me-2">Sugestão:</label>
          <input
            type="radio"
            id="sugestao"
            value="Sugestão"
            onChange={() => setTipoSolicitacao('Sugestão')}
            name="tipo-solicitacao"
            className="form-check-input"
          />
        </fieldset>

        <br />
        <p><label htmlFor="descricao">Descrição: </label><br />
          <textarea name="" id="descricao" cols="20" rows="2" className="form-control" onChange={(e) => setDescricao(e.target.value)}></textarea></p>
        <button onClick={(event) => criarSolicitacao(event)} className="btn btn-dark mb-3">Enviar</button>

      </form>

    </div>
  );
}

export default Home;
