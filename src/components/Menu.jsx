import React from "react";

function Menu() {
  return (
    <header>
      <nav className="pt-1 navbar navbar-expand-lg navbar-dark text-bg-dark w-50 container text-center" id="navbar">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link active link-light link-menu" aria-current="page" href="http://localhost:3000"><i className="bi bi-book me-2"></i>UniBook
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-light link-menu mr-n1" href="#about">FAQ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-light link-menu" href="#promocoes">Solicitações</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Menu;
