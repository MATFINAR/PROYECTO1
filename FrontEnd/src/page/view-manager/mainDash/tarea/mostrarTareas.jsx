import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { deleteTask } from './eliminarUnTarea'; 

const ShowTasks = () => {
  const [tareas, setTareas] = useState([]);
  const [busqueda, setBusqueda] = useState('');

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
    } catch (error) {
      console.error('Error al obtener tareas:', error);
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
    } catch (error) {
      console.error('Error al buscar tarea:', error);
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
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?');
    if (confirmar) {
      const resultado = await deleteTask(nombre);
      console.log(resultado);
      if (resultado.resultado === 'Tarea eliminada exitosamente') {
        mostrarTareas();
      } else {
        console.error('Error al eliminar tarea:', resultado.resultado);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar tarea..."
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="cards-container">
        {tareas.map((tarea, index) => (
          <div key={tarea.id} className="card">
            <h3>{tarea.nombre}</h3>
            <p>{tarea.descripcion}</p>
            <p>Estado: {tarea.estado}</p>
            <p>Fecha limite: {tarea.fecha_limite}</p>
            <p>A que proyecto pertenece: {tarea.proyecto_id}</p>
            <button onClick={() => handleDelete(tarea.nombre)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTasks;