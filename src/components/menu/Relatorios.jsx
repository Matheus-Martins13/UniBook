import React from 'react';
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { useEffect } from 'react';
import { collection, getDocs, getFirestore, doc, deleteDoc } from "firebase/firestore";

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
    <>
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
    </>
  );
}

export default Relatorios;
