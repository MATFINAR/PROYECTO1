import "./style/mostrarProyectos.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { deleteProyect } from './eliminarUnProyecto'; // Importa la función deleteProyect

const ShowProjects = () => {
  const [proyectos, setProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(''); // State to handle error messages
  const [confirmacionVisible, setConfirmacionVisible] = useState(false); // State to control confirmation dialog visibility
  const [proyectoAEliminar, setProyectoAEliminar] = useState(null); // State to store the project to delete

  useEffect(() => {
    mostrarProyectos();
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
      setError(''); // Clear error state when projects are successfully fetched
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
        setError('Proyecto no encontrado'); // Set error state if no projects are found
        setProyectos([]); // Clear projects state
      } else {
        setProyectos(response.data);
        setError(''); // Clear error state if projects are found
      }
    
    } catch (error) {
      console.error('Error al buscar proyecto:', error);
    }
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    setError(''); // Clear error state when user types
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarProyecto();
  };

  const handleDelete = async (nombre) => {
    setProyectoAEliminar(nombre);
    setConfirmacionVisible(true); // Show confirmation dialog
  };

  const confirmarEliminar = async () => {
    try {
      const token = Cookies.get('token');
      await deleteProyect(proyectoAEliminar, token);
      setConfirmacionVisible(false); // Hide confirmation dialog
      mostrarProyectos(); // Refresh projects list
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  };

  return (
    <div className="container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar tarea..."
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      {error && <p className="error-message">{error}</p>} {/* Display error message */}

      <div className="cards-container">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="card">
            <h3 className="card-title">{proyecto.nombre}</h3>
            <p className="card-description">{proyecto.descripcion}</p>
            <p className="card-info">Estado: {proyecto.estado}</p>
            <p className="card-info">Prioridad: {proyecto.prioridad}</p>
            <p className="card-info">Manager: {proyecto.manager_id}</p>
            <p className="card-info">Fecha de actualización: {proyecto.fecha_actualizacion}</p>
            <button className="delete-button" onClick={() => handleDelete(proyecto.nombre)}>
              Eliminar
            </button>
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
