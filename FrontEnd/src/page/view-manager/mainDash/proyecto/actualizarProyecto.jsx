import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const UpdateProject = () => {
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState({
    Nombre: '',
    Descripcion: '',
    FechaInicio: '',
    FechaFin: '',
    NombreAnterior: '',
  });
  const [error, setError] = useState('');

  const handleBuscarProyecto = async () => {
    const token = Cookies.get('token');

    try {
      const response = await axios.get(`http://localhost:666/api/project/${proyecto.NombreAnterior}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.length > 0) {
        setProyecto({
          ...response.data[0],
          NombreAnterior: response.data[0].Nombre,
        });
      } else {
        setError('Proyecto no encontrado');
      }
    } catch (error) {
      setError('Error fetching project data');
      console.error('Error fetching project data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto((prevProyecto) => ({
      ...prevProyecto,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    try {
      // Verificar si el nombre del proyecto ya existe
      const verifyResponse = await axios.get(`http://localhost:666/api/project/${proyecto.Nombre}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (verifyResponse.data.length > 0 && verifyResponse.data[0].Nombre !== proyecto.NombreAnterior) {
        setError('El nombre del proyecto ya existe');
        return;
      }

      // Actualizar el proyecto
      const response = await axios.put('http://localhost:666/api/project', proyecto, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.resultado === "Proyecto actualizado exitosamente") {
        window.location.reload(); // Navegar a la página de proyectos
      } else {
        setError('Error updating project: ' + response.data.resultado);
      }
    } catch (error) {
      setError('Error updating project');
      console.error('Error updating project:', error);
    }
  };

  return (
    <div>
      <h2>Editando Proyecto: {proyecto.NombreAnterior}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del proyecto que desea actualizar:
          <input
            type="text"
            name="NombreAnterior"
            value={proyecto.NombreAnterior}
            onChange={handleChange}
            required
          />
        </label>
        <button type="button" onClick={handleBuscarProyecto}>Buscar Proyecto</button>
        <label>
          Nombre:
          <input
            type="text"
            name="Nombre"
            value={proyecto.Nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="Descripcion"
            value={proyecto.Descripcion}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Fecha de inicio:
          <input
            type="date"
            name="FechaInicio"
            value={proyecto.FechaInicio}
            onChange={handleChange}
          />
        </label>
        <label>
          Fecha de fin:
          <input
            type="date"
            name="FechaFin"
            value={proyecto.FechaFin}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateProject;
