import "../style/dashBoard.css";
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import MainDash from "./mainDash";

function DashBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [forceRerender, setForceRerender] = useState(false);

  const handleOptionClick = (path) => {
    if (location.pathname === path) {
      setForceRerender(!forceRerender); // Toggle the state to force a re-render
    } else {
      navigate(path);
    }
  };
  
  return (
    <div className="content-dashboard">
      <div className="header-dashboard">
        <div className="logo1-dashboard"></div>
        <div className="ubicacion-dashboard">Inicio</div>
        <div className="config-dashboard"></div>
      </div>
      <div className="aside-dashboard">
        <div className="options-dashboard">
          <button onClick={() => handleOptionClick("/dash/calendario")}>Calendario</button>
          <button onClick={() => handleOptionClick("/dash/listausuario")}>Lista de usuario</button>
          <button onClick={() => handleOptionClick("/dash/agregarusuario")}>Agregar Usuario</button>
          <button onClick={() => handleOptionClick("/dash/proyectos")}>Proyectos</button>
          <button onClick={() => handleOptionClick("/dash/tareas")}>Tareas</button>
        </div>
      </div>
      <div className="main-dashboard">
        <MainDash key={forceRerender ? 'rerender' : 'normal'} />
      </div>
    </div>
  );
};

export default DashBoard;