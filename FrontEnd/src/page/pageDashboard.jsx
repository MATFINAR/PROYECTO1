import "../style/dashBoard.css"
import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
  const navigate = useNavigate();

  const handleOptionClick = (path) => {
    navigate(path);
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
          <button onClick={() => handleOptionClick("/calendario")}>Calendario</button>
          <button onClick={() => handleOptionClick("/listausuario")}>Lista de usuario</button>
          <button onClick={() => handleOptionClick("/agregarusuario")}>Agregar Usuario</button>
          <button onClick={() => handleOptionClick("/proyectos")}>Proyectos</button>
          <button onClick={() => handleOptionClick("/tareas")}>Tareas</button>
        </div>
      </div>
      <div className="main-dashboard">
      </div>
    </div>
  );
};

export default DashBoard;
