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
  query,
  where,
  QueryConstraint
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC4-Vuc6Y5Wr8Po2JTJphKZj9o8xaegnF0",
  authDomain: "project-unig.firebaseapp.com",
  projectId: "project-unig",
});

function Relatorios() {

  const [solicitacoes, setSolicitacoes] = useState([]);

  const db = getFirestore(firebaseApp);
  const solicitacaoCollectionRef = collection(db, 'solicitacoes');

  async function deleteSolicitacao(id) {
    const solicitacaoDoc = doc(db, 'solicitacoes', id);
    await deleteDoc(solicitacaoDoc);
  }

  useEffect(() => {
    const getSolicitacoes = async () => {
      const data = await getDocs(solicitacaoCollectionRef);
      setSolicitacoes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getSolicitacoes();
  }, []);

  return (
    <div className="container text-start bg-light p-3 w-50">
      <h1>Relatórios</h1>

      {!solicitacoes[0] && (
        <div className="alert alert-warning">
          <h3>Nenhum relatório disponível.</h3>
          <p>Cadastre solicitações na página inicial para que os relatórios sejam exibidos nesta página!</p>
        </div>
      )}

      <div className='alert alert-secondary'>
        <ol>
          {solicitacoes.map((solicitacao) => {
            return (
              <div key={solicitacao.id} >
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

      </div>

    </div >
  );
}

export default Relatorios;
