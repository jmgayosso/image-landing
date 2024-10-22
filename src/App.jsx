// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './UploadPage'; // Importa tu nuevo componente
import Home from './Home'

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Otras rutas existentes */}
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<UploadPage />} />
            </Routes>
        </Router>
    );
};

export default App;
