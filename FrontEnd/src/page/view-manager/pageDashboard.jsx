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
    const interval = setInterval(async () => {
      const token = Cookies.get('token');
      const { usuario_id } = JSON.parse(atob(token.split('.')[1]));

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:666/api/usuario/existe', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: { usuario_id }
        });

        if (!response.data.existe) {
          Cookies.remove('token');
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
        Cookies.remove('token');
        navigate('/');
      }
    }, 200000); // Verificar cada 2 horas

    return () => clearInterval(interval);
  }, [navigate]);

  const handleOptionClick = (path, title) => {
    if (location.pathname === path) {
      setForceRerender(!forceRerender); // Toggle the state to force a re-render
    } else {
      navigate(path);
    }
  };

  const toggleConfigMenu = () => {
    setShowConfigMenu(!showConfigMenu); // Toggle the visibility of the config menu
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
        alert('Usuario eliminado exitosamente');
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
              <button className="go-out-menu-button" onClick={handleLogout}>Cerrar sesion</button>
              <button className="delete-menu-button" onClick={handleDeleteAccount}>Eliminar cuenta</button>
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
    </div>
  );
}

export default DashBoard;
