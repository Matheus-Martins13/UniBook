import React from 'react';
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { useEffect } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC4-Vuc6Y5Wr8Po2JTJphKZj9o8xaegnF0",
  authDomain: "project-unig.firebaseapp.com",
  projectId: "project-unig",
});

function Relatorios() {

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [tipo, setTipo] = useState('Sugestão');
  const [solicitacoesFormatadas, setSolicitacoesFormatadas] = useState([]);
  const [controlador, setControlador] = useState(null);

  const db = getFirestore(firebaseApp);
  const solicitacaoCollectionRef = collection(db, 'solicitacoes');

  async function deleteSolicitacao(id) {
    const solicitacaoDoc = doc(db, 'solicitacoes', id);
    await deleteDoc(solicitacaoDoc);
  }

  function buscaSolicitacao(e) {
    e.preventDefault();
    setControlador(1);
    const novasSolicitacoes = solicitacoes.filter((solicitacao) => {
      return solicitacao.tipoSolicitacao === tipo;
    });
    return setSolicitacoesFormatadas(novasSolicitacoes);
  }

  useEffect(() => {
    const getSolicitacoes = async () => {
      const data = await getDocs(solicitacaoCollectionRef);
      setSolicitacoes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getSolicitacoes();
  }, []);

  return (
    <div className="container text-start bg-light p-3">
      <h1>Relatórios</h1>

      <form>
        <p><label htmlFor="" >Filtre os tipos de solicitações: </label> <br />
          <select className="form-select" aria-label="Default select example" onChange={(e) => setTipo(e.target.value)}>
            <option value='Sugestão'>Sugestão</option>
            <option value='Reclamação'>Reclamação</option>

          </select></p>
        <button className='btn btn-dark mb-5' onClick={(e) => buscaSolicitacao(e)}>Filtrar</button>
      </form>

      {!solicitacoes[0] && (
        <div className="alert alert-warning">
          <h3>Nenhum relatório disponível.</h3>
          <p>Cadastre solicitações na página inicial para que os relatórios sejam exibidos nesta página!</p>
        </div>
      )}

      {controlador && (
        <ol className="alert alert-secondary">
          {solicitacoesFormatadas.map((solicitacao) => {
            return (
              <div key={solicitacao.id} className="p-2">
                <li>
                  <div>Nome: {solicitacao.nome}</div>
                  <div>E-mail: {solicitacao.email}</div>
                  <div>Matrícula: {solicitacao.matricula}</div>
                  <div>Curso: {solicitacao.curso}</div>
                  <div>Tipo de solicitação: {solicitacao.tipoSolicitacao}</div>
                  <div>Data e hora da solicitação: {solicitacao.date}</div>
                  <div>Descrição: {solicitacao.descricao}</div>
                </li>
                <button className="btn btn-danger mt-3 mb-4" onClick={() => deleteSolicitacao(solicitacao.id)}>Remover</button>
              </div>
            )
          })}
        </ol>
      )}

    </div >
  );
}

export default Relatorios;
