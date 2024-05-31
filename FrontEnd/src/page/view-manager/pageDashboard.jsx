import "./mainDash/style/dashBoard.css";
import { DiAptana } from "react-icons/di";
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import MainDash from "./mainDash";
import Cookies from 'js-cookie';
import axios from 'axios';

function DashBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [forceRerender, setForceRerender] = useState(false);
  const [activeOption, setActiveOption] = useState("");
  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Estado para el mensaje de confirmación
  const [countdown, setCountdown] = useState(2000000); // Tiempo de espera inicial

  useEffect(() => {
    const pathToTitleMap = {
      "/dash-manager/calendario": "Calendario",
      "/dash-manager/listausuario": "Lista usuario",
      "/dash-manager/asignarrol": "Asignar el rol",
      "/dash-manager/proyectos": "Proyectos",
      "/dash-manager/tareas": "Tareas",
    };
    const currentTitle = pathToTitleMap[location.pathname] || "Inicio";
    setActiveOption(currentTitle);
    localStorage.setItem('activeOption', currentTitle);
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1000); // Resta 1 segundo al contador cada vez que se ejecuta el intervalo
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      Cookies.remove('token')
      navigate('/');
    }
  }, [countdown, navigate]);

  const handleOptionClick = (path, title) => {
    if (location.pathname === path) {
      setForceRerender(!forceRerender); 
    } else {
      navigate(path);
    }
  };

  const toggleConfigMenu = () => {
    setShowConfigMenu(!showConfigMenu); 
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };  

  const handleDeleteAccount = async () => {
    const token = Cookies.get('token');

    if (!token) {
      alert('No tiene permiso para acceder');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:666/api/usuario', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.resultado === 'Usuario eliminado exitosamente') {
        Cookies.remove('token');
        navigate('/');
      } else {
        alert(response.data.resultado || 'Error al eliminar usuario');
      }
    } catch (error) {
      alert('Error: No tiene permiso para acceder o problemas con el servidor.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="content-dashboard">
      <div className="header-dashboard">
        <div className="logo1-dashboard"></div>
        <div className="ubicacion-dashboard">{activeOption}</div>
        <div className="config-dashboard" onClick={toggleConfigMenu}>
          <DiAptana className="config-icon" />
          {showConfigMenu && (
            <div className="config-menu">
              <button className="go-out-menu-button" onClick={handleLogout}>Cerrar sesión</button>
              <button className="delete-menu-button" onClick={() => setShowConfirmDelete(true)}>Eliminar cuenta</button>
            </div>
          )}
        </div>
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
      {showConfirmDelete && (
        <div className="confirm-delete-overlay">
          <div className="confirm-delete-card">
            <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
            <button onClick={handleDeleteAccount}>Sí, eliminar</button>
            <button onClick={() => setShowConfirmDelete(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;