import React from "react";

function Rodape() {
  return (

    <footer className="border-top fixed-buttom text-light bg-dark w-50 container rounded-2">
      <div className="container">
        <div className="row py-3">
          <div className="col-12 col-md-4 text-center text-md-start">
            <h5>Contato</h5>
            <i className="bi bi-telephone"></i> (21) 21969595543
          </div>
          <div className="col-12 col-md-4 text-center">
            &copy; 2022 - UniBook - Todos os direitos reservados
          </div>
          <div className="col-12 col-md-4 text-center text-md-end">
            <h5>Suporte</h5>
            suporte@unibook.com.br
          </div>
        </div>


        </div>

    </footer>
  )
}

export default Rodape;
