import '../../style/listarUsuario.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ListarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:666/api/usuario/');
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setError('Hubo un problema al obtener los usuarios');
        console.error('Error:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleOptionClick = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  const renderUsuarios = () => {
    return usuarios.map((usuario) => (
      <div className='targeta' key={usuario.id}>
        {usuario.name} <br/> {usuario.email}
      </div>
    ));
  };

  return (
    <div className="content-dashboard">
      <div className="header-dashboard">
        <div className="logo1-dashboard"></div>
        <div className="ubicacion-dashboard">Lista de Usuarios</div>
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
        <div className='targetas-lista-usuario'>
          {renderUsuarios()}
        </div>
      </div>
    </div>
  );
}

export default ListarUsuario;
