import "../style/dashBoard.css"
import React, { useState } from 'react';
import ListarUsuarios from "./components/editarMainDash/listarUsuario.jsx";

export const DashBoard = () => {
    const [currentComponent, setCurrentComponent] = useState(null);
    const [estado, setEstado] = useState(null);
    
    return(
        <div className="content-dashboard">
            <div className="header-dashboard">
                <div className="logo1-dashboard"></div>
                <div className="ubicacion-dashboard">{estado}</div>
                <div className="config-dashboard"></div>
            </div>
            <div className="aside-dashboard">
                <div className="options-dashboard">
                    <button>Calendario</button>
                    <button onClick={()=> {setCurrentComponent(<ListarUsuarios/>); setEstado("Listar Usuario");}}>Lista de usuario</button>

                    <button>Agregar Usuario</button>
                    <button>Poryectos</button>
                    <button>Tareas</button>
                </div>
            </div>
            <div className="main-dashboard">
                {currentComponent}
            </div>
        </div>    
        )
}