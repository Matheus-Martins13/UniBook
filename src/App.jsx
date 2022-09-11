import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Faq from './components/menu/Faq';
import Home from './components/Home';
import Relatorios from './components/menu/Relatorios';
import Rodape from './components/Rodape';

function App() {

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/relatorios" element={<Relatorios/>} />
        </Routes>
      </Router>
      
      <Rodape/>
    </div>
  );
}

export default App;
