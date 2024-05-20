import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function MostrarCalendario() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOptionClick = (path) => {
    if (location.pathname === path) {
      window.location.reload();
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

export default MostrarCalendario;
