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

  const handleDelete = async (Nombre) => {
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?');
    if (confirmar) {
      const resultado = await deleteTask(Nombre);
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
      <h1>Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar tarea..."
        />
        <button type="submit">Buscar Tarea</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Fecha Final</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea, index) => (
            <tr key={tarea.id}>
              <th>{index + 1}</th>
              <td>{tarea.Nombre}</td>
              <td>{tarea.Descripcion}</td>
              <td>{tarea.FechaInicio}</td>
              <td>{tarea.FechaFin}</td>
              <th>{tarea.Estado}</th>
              <th><button onClick={() => handleDelete(tarea.Nombre)}>Eliminar</button></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTasks;