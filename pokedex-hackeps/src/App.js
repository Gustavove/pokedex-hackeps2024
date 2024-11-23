import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


import Captura from './home'; // Tu componente para la pantalla principal
import Llistat from './llistat'; // Otro componente para la pantalla de "Acerca de"
import Equips from './equips'; // Otro componente para la pantalla de "Acerca de"



function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
  );
}

export default App;
