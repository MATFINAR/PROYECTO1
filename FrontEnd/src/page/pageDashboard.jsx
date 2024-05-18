import "../style/dashBoard.css"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DashBoard = () => {
    const [currentComponent, setCurrentComponent] = useState(null);
    
    return(
        <div className="content-dashboard">
            <div className="header-dashboard">
                <div className="logo1-dashboard"></div>
                <div className="ubicacion-dashboard">HOLA</div>
                <div className="config-dashboard"></div>
            </div>
            <div className="aside-dashboard">
                <div className="options-dashboard">
                    <button>Calendario</button>
                    <button onClick={()=> setCurrentComponent("")}>Lista de usuario</button>
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