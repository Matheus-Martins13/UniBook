import React from "react";
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


function Faq() {
  const [faq, setFaq] = useState([]);

  const db = getFirestore(firebaseApp);
  const faqCollectionRef = collection(db, 'faq');

  useEffect(() => {
    const getFaq = async () => {
      const data = await getDocs(faqCollectionRef);
      setFaq(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getFaq();
  }, []);

  return (
    <div className="w-50 container">
      {faq.map((item) => {
        return (
          <div className="accordion" id="accordionExample" key={item.id}>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  {item.pergunta}
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {item.resposta}
                </div>
              </div>
            </div>
          </div>
        )
      })}

    </div>
  );
}

export default Faq;
