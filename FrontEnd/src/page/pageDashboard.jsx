import "../style/dashBoard.css";
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import MainDash from "./mainDash";

function DashBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [forceRerender, setForceRerender] = useState(false);
  const [activeOption, setActiveOption] = useState("Inicio");

  const handleOptionClick = (path, title) => {
    if (location.pathname === path) {
      setForceRerender(!forceRerender); // Toggle the state to force a re-render
    } else {
      navigate(path);
      setActiveOption(title);
    };
  };
  
  return (
    <div className="content-dashboard">
      <div className="header-dashboard">
        <div className="logo1-dashboard"></div>
        <div className="ubicacion-dashboard">{activeOption}</div>
        <div className="config-dashboard"></div>
      </div>
      <div className="aside-dashboard">
        <div className="options-dashboard">
          <button onClick={() => handleOptionClick("/dash/calendario", "calendario")}>Calendario</button>
          <button onClick={() => handleOptionClick("/dash/listausuario", "Lista usuario")}>Lista de usuario</button>
          <button onClick={() => handleOptionClick("/dash/agregarusuario", "Agregar Usuario")}>Agregar Usuario</button>
          <button onClick={() => handleOptionClick("/dash/proyectos", "Proyectos")}>Proyectos</button>
          <button onClick={() => handleOptionClick("/dash/tareas", "Tareas")}>Tareas</button>
        </div>
      </div>
      <div className="main-dashboard">
        <MainDash key={forceRerender ? 'rerender' : 'normal'} />
      </div>
    </div>
  );
};

export default DashBoard;