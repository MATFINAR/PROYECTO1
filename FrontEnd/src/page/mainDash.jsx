import React from "react";
import { Route, Routes } from "react-router-dom";
import MostrarCalendario from './components/mainDash/mostrarCalendario.jsx';
import ListarUsuario from './components/mainDash/listarUsuario.jsx'
import AgregarUsuario from './components/mainDash/agregarUsuario.jsx';
import Proyectos from './components/mainDash/proyectos.jsx';
import Tareas from './components/mainDash/tareas.jsx';

function MainDash(){
    return(
        <div>
            <Routes>
                <Route path="/calendario" element={<MostrarCalendario/>} />
                <Route path="/listausuario" element={<ListarUsuario />} />
                <Route path="/agregarusuario" element={<AgregarUsuario/>} />
                <Route path="/proyectos" element={<Proyectos/>} />
                <Route path="/tareas" element={<Tareas/>} />
            </Routes>
        </div>
    );
};

export default MainDash;
