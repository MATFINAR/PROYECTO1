import "./style/dashBoard.css";
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import MainDash from "./mainDash";

function DashBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [forceRerender, setForceRerender] = useState(false);
  const [activeOption, setActiveOption] = useState(localStorage.getItem('activeOption') || "");

  useEffect(() => {
    const storedOption = localStorage.getItem('activeOption');
    if (storedOption) {
      setActiveOption(storedOption);
    }
  }, []);

  const handleOptionClick = (path, title) => {
    if (location.pathname === path) {
      setForceRerender(!forceRerender); // Toggle the state to force a re-render
    } else {
      navigate(path);
    }
    setActiveOption(title);
    localStorage.setItem('activeOption', title);
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
          <button onClick={() => handleOptionClick("/dash-manager/calendario", "Calendario")}>Calendario</button>
          <button onClick={() => handleOptionClick("/dash-manager/listausuario", "Lista usuario")}>Lista de usuario</button>
          <button onClick={() => handleOptionClick("/dash-manager/asignarrol", "Asignar el rol")}>Asignar el rol</button>
          <button onClick={() => handleOptionClick("/dash-manager/proyectos", "Proyectos")}>Proyectos</button>
          <button onClick={() => handleOptionClick("/dash-manager/tareas", "Tareas")}>Tareas</button>
        </div>
      </div>
      <div className="main-dashboard">
        <MainDash key={forceRerender ? 'rerender' : 'normal'} />
      </div>
    </div>
  );
};

export default DashBoard;
