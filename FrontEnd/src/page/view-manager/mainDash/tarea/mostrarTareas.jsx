import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { deleteTask } from './eliminarUnTarea';

const ShowTasks = () => {
  const [tareas, setTareas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState('');
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  useEffect(() => {
    mostrarTareas();
  }, []);

  const mostrarTareas = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:666/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTareas(response.data);
      setError('');
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      setError('Error al obtener tareas');
    }
  };

  const buscarTarea = async () => {
    try {
      if (busqueda.trim() === '') {
        mostrarTareas();
        return;
      }

      const token = Cookies.get('token');
      const response = await axios.get(`http://localhost:666/api/task/${busqueda}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTareas(response.data);
      if (response.data.length === 0) {
        setError('Tarea no encontrada');
      } else {
        setError('');
      }
    } catch (error) {
      console.error('Error al buscar tarea:', error);
      setError('Error al buscar tarea');
    }
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarTarea();
  };

  const handleDelete = async (nombre) => {
    setTareaAEliminar(nombre);
    setConfirmacionVisible(true);
  };

  const confirmarEliminar = async () => {
    try {
      const token = Cookies.get('token');
      await deleteTask(tareaAEliminar, token);
      setConfirmacionVisible(false);
      mostrarTareas();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      setError('Error al eliminar tarea');
    }
  };

  return (
    <div>
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

      {error && <p className="error-message">{error}</p>}

      <div className="cards-container">
        {tareas.map((tarea, index) => (
          <div key={tarea.id} className="card">
            <h3 className="card-title">{tarea.nombre}</h3>
            <p className="card-description">{tarea.descripcion}</p>
            <p className="card-info">Estado: {tarea.estado}</p>
            <p className="card-info">Fecha limite: {tarea.fecha_limite}</p>
            <p className="card-info">Proyecto ID: {tarea.proyecto_id}</p>
            <button className="delete-button" onClick={() => handleDelete(tarea.nombre)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {confirmacionVisible && (
        <div className="confirmacion-overlay">
          <div className="confirmacion-box">
            <p>{`¿Está seguro de que desea eliminar la tarea ${tareaAEliminar}?`}</p>
            <button onClick={confirmarEliminar}>Confirmar</button>
            <button onClick={() => setConfirmacionVisible(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowTasks;