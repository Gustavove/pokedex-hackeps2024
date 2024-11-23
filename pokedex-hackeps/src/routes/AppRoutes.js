import { Routes, Route } from 'react-router-dom';
import Captura from '../pages/Captura';
import Llistat from '../pages/Llistat';
import InfoPokemon from '../pages/InfoPokemon';
import Equips from '../pages/Equips';
import TestPokemonService from '../services/testPokemonService'
import React from "react";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Captura />} />
            <Route path="/llistat" element={<Llistat />} />
            <Route path="/infoPokemon/:id" element={<InfoPokemon />} />
            <Route path="/equips" element={<Equips />} />
            <Route path="/test" element={<testPokemonService />} />

        </Routes>
    );
}

export default AppRoutes;