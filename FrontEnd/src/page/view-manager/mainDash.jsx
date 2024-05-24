import React from "react";
import { Route, Routes } from "react-router-dom";
import MostrarCalendario from './mainDash/mostrarCalendario.jsx';
import ListarUsuario from './mainDash/listarUsuario.jsx'
import Proyectos from './mainDash/proyectos.jsx';
import Tareas from './mainDash/tareas.jsx';
import AsignarRango from "./mainDash/asignarRango.jsx";

function MainDash(){
    return(
        <div>
            <Routes>
                <Route path="/calendario" element={<MostrarCalendario />} />
                <Route path="/listausuario" element={<ListarUsuario />} />
                <Route path="/asignarrol" element={<AsignarRango />} />
                <Route path="/proyectos" element={<Proyectos />} />
                <Route path="/tareas" element={<Tareas />} />
            </Routes>
        </div>
    );
};

export default MainDash;