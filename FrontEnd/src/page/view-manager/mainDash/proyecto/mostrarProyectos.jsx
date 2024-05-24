import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { deleteProyect } from './eliminarUnProyecto'; // Importa la función deleteProyect

const ShowProjects = () => {
  const [proyectos, setProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    mostrarProyectos();
  }, []);

  const mostrarProyectos = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:666/api/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProyectos(response.data);
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
      const response = await axios.get(`http://localhost:666/api/project/${busqueda}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProyectos(response.data);
    } catch (error) {
      console.error('Error al buscar proyecto:', error);
    }
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarProyecto();
  };

  const handleDelete = async (Nombre) => {
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar este proyecto?');
    if (confirmar) {
      const resultado = await deleteProyect(Nombre);
      console.log(resultado);
      if (resultado.resultado === 'Proyecto eliminado exitosamente') {
        mostrarProyectos();
      } else {
        console.error('Error al eliminar proyecto:', resultado.resultado);
      }
    }
  };

  return (
    <div>
      <h1>Proyectos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar proyecto..."
        />
        <button type="submit">Buscar Proyecto</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Fecha Final</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto, index) => (
            <tr key={proyecto.id}>
              <th>{index + 1}</th>
              <td>{proyecto.Nombre}</td>
              <td>{proyecto.Descripcion}</td>
              <td>{proyecto.FechaInicio}</td>
              <td>{proyecto.FechaFin}</td>
              <th><button onClick={() => handleDelete(proyecto.Nombre)}>Eliminar</button></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProjects;