import "../style/dashBoard.css";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MainDash from "./mainDash";

function DashBoard() {
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState("Inicio");

  const handleOptionClick = (path, title) => {
    setActiveOption(title);
    navigate(`/dash/${path}`);
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
          <button onClick={() => handleOptionClick("calendario", "Calendario")}>Calendario</button>
          <button onClick={() => handleOptionClick("listausuario", "Lista de usuario")}>Lista de usuario</button>
          <button onClick={() => handleOptionClick("agregarusuario", "Agregar Usuario")}>Agregar Usuario</button>
          <button onClick={() => handleOptionClick("proyectos", "Proyectos")}>Proyectos</button>
          <button onClick={() => handleOptionClick("tareas", "Tareas")}>Tareas</button>
        </div>
      </div>
      <div className="main-dashboard">
        <MainDash />
      </div>
    </div>
  );
};

export default DashBoard;
