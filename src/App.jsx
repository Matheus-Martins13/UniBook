import React from 'react';

import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from 'react';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC4-Vuc6Y5Wr8Po2JTJphKZj9o8xaegnF0",
  authDomain: "project-unig.firebaseapp.com",
  projectId: "project-unig",
});


function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('Administração');
  const [tipoSolicitacao, setTipoSolicitacao] = useState('');
  const [date, setDate] = useState(`${new Date().toLocaleDateString('pt-br')} | ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
  const [descricao, setDescricao] = useState('');

  const [solicitacoes, setSolicitacoes] = useState([]);

  const db = getFirestore(firebaseApp);
  const solicitacaoCollectionRef = collection(db, 'solicitacoes');

  async function criarSolicitacao(event) {
    event.preventDefault();
    setDate(retornaData());
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

  function retornaData() {
    const dateObject = new Date();
    return `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()} | ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`
  }

  async function deleteSolicitacao(id) {
    const solicitacaoDoc = doc(db, 'solicitacoes', id);
    await deleteDoc(solicitacaoDoc);
  }

  useEffect(() => {
    const getSolicitacoes = async () => {
      const data = await getDocs(solicitacaoCollectionRef);
      setSolicitacoes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

      
    }
    getSolicitacoes();
    
  }, []);

  return (
    <div>

      <ul>
        {solicitacoes.map((solicitacao) => {
          return (
            <div key={solicitacao.id}>
              <li>{solicitacao.nome}</li>
              <li>{solicitacao.id}</li>
              <li>{solicitacao.descricao}</li>
              <li>{solicitacao.tipoSolicitacao}</li>
              <li>{solicitacao.curso}</li>
              <li>{solicitacao.date}</li>
              <button onClick={() => deleteSolicitacao(solicitacao.id)}>Apagar solicitacao</button>
            </div>
          )
        })}
      </ul>

      <form>
        <p><label htmlFor="nome">Nome</label>
          <input
            type="text"
            value={nome}
            id="nome"
            onChange={(e) => setNome(e.target.value)}
          /></p>

        <label htmlFor="email">E-mail </label>
        <input
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p><label htmlFor="">Matrícula </label> <br />
          <input
            type="number"
            value={matricula}
            id="nome"
            onChange={(e) => setMatricula(parseInt(e.target.value))}
          /></p>

        <p><label htmlFor="" >Curso </label>
          <select name="" id="" onChange={(e) => setCurso(e.target.value)}>
            <option value='Administração'>Administração</option>
            <option value='Análise de Sistemas'>Análise de Sistemas</option>
            <option value='Biologia'>Ciências Biológicas</option>
            <option value='Engenharia'>Engenharia</option>
          </select></p>

        <fieldset>
          <legend>Tipo de Solicitação</legend>
          <label htmlFor="">Sugestção </label>
          <input
            type="radio"
            id=""
            value="Reclamação"
            onChange={() => setTipoSolicitacao('Reclamação')}
            name="tipo-solicitacao"
          />

          <br />

          <label htmlFor="">Reclamação </label>
          <input
            type="radio"
            id=""
            value="Sugestão"
            onChange={() => setTipoSolicitacao('Sugestão')}
            name="tipo-solicitacao" />

        </fieldset>

        <p><label htmlFor="">Descrição</label><br />
          <textarea name="" id="" cols="30" rows="10" onChange={(e) => setDescricao(e.target.value)}></textarea></p>

        <button onClick={(event) => criarSolicitacao(event)}>Enviar</button>

      </form>
    </div>
  );
}

export default App;
