import {Routes, Route } from "react-router-dom";
import Llistat from '../pages/Llistat';
import InfoPokemon from '../pages/InfoPokemon';
import Equips from '../pages/Equips';
import Layout from "../pages/Layout";
import React from "react";
import Captura from "../pages/Captura";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Captura />} />
                <Route path="/captura" element={<Captura />} />
                <Route path="/llistat" element={<Llistat />} />
                <Route path="/infoPokemon/:nou/:id" element={<InfoPokemon />} />
                <Route path="/equips" element={<Equips />} />
            </Route>
        </Routes>
    );
};


export default AppRoutes;