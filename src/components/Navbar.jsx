import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <nav className="pt-1 navbar navbar-expand-lg navbar-dark text-bg-dark w-50 container text-center rounded-2" id="navbar">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active link-light link-menu" aria-current="page"><i className="bi bi-book me-2"></i>UniBook</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light link-menu mr-n1" to="/faq">FAQ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light link-menu" to="/relatorios">Relatórios</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
