import "./style/mostrarProyectos.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { deleteProyect } from './eliminarUnProyecto'; 
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ShowProjects = () => {
  const [proyectos, setProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(''); 
  const [confirmacionVisible, setConfirmacionVisible] = useState(false); 
  const [proyectoAEliminar, setProyectoAEliminar] = useState(null); 
  const [userRole, setUserRole] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    mostrarProyectos();
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.rol);
    }
  }, []);

  const mostrarProyectos = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:666/api/proyectos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProyectos(response.data);
      setError('');
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };

  const buscarProyecto = async () => {
    try {
      if (busqueda.trim() === '') {
        mostrarProyectos();
        return;
      }

      const token = Cookies.get('token');
      const response = await axios.get(`http://localhost:666/api/proyecto/${busqueda}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.length === 0) {
        setError('Proyecto no encontrado');
        setProyectos([]);
      } else {
        setProyectos(response.data);
        setError('');
      }
    
    } catch (error) {
      console.error('Error al buscar proyecto:', error);
    }
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    setError('');

    if (event.target.value.trim() === '') {
      mostrarProyectos();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarProyecto();
  };

  const handleDelete = async (nombre) => {
    setProyectoAEliminar(nombre);
    setConfirmacionVisible(true);
  };

  const confirmarEliminar = async () => {
    try {
      const token = Cookies.get('token');
      await deleteProyect(proyectoAEliminar, token);
      setConfirmacionVisible(false);
      mostrarProyectos();
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  };

  const mostrarTareasProyecto = (proyectoNombre) => {
    navigate(`/dash-manager/tareas/${proyectoNombre}`);
  };

  return (
    <div className="container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar proyecto..."
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="cards-container">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="card">
            <h3 className="card-title">{proyecto.nombre}</h3>
            <p className="card-description">{proyecto.descripcion}</p>
            <p className="card-info">Estado: {proyecto.estado}</p>
            <p className="card-info">Prioridad: {proyecto.prioridad}</p>
            <p className="card-info">Manager del proyecto: {proyecto.manager_email}</p>
            <p className="card-info">Fecha de actualización: {proyecto.fecha_actualizacion}</p>
            <button className="task-button" onClick={() => mostrarTareasProyecto(proyecto.nombre)}>
              Tareas
            </button>
            {userRole === 'Manager' && (
              <button className="delete-button" onClick={() => handleDelete(proyecto.nombre)}>
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>

      {confirmacionVisible && (
        <div className="confirmacion-overlay">
          <div className="confirmacion-box">
            <p>{`¿Está seguro de que desea eliminar el proyecto ${proyectoAEliminar}?`}</p>
            <button onClick={confirmarEliminar}>Confirmar</button>
            <button onClick={() => setConfirmacionVisible(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProjects;
