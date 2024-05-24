import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const EditarProyecto = () => {
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

      setProyecto({ ...response.data, NombreAnterior: response.data.Nombre });
    } catch (error) {
      setError('Error fetching project data');
      console.error('Error:', error);
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
      const response = await axios.put('http://localhost:666/api/project', proyecto, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.resultado === "Proyecto actualizado exitosamente") {
        window.location.reload(); // Recarga la página
      } else {
        setError('Error updating project');
      }
    } catch (error) {
      setError('Error updating project');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Editando Proyecto: {proyecto.NombreAnterior}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del proyecto que desea actualizar:
          <input type="text" name="NombreAnterior" value={proyecto.NombreAnterior} onChange={handleChange} required />
        </label>
        <label>
          Nombre:
          <input type="text" name="Nombre" value={proyecto.Nombre} onChange={handleChange} required />
        </label>
        <label>
          Descripción:
          <textarea name="Descripcion" value={proyecto.Descripcion} onChange={handleChange}></textarea>
        </label>
        <label>
          Fecha de inicio:
          <input type="date" name="FechaInicio" value={proyecto.FechaInicio} onChange={handleChange} />
        </label>
        <label>
          Fecha de fin:
          <input type="date" name="FechaFin" value={proyecto.FechaFin} onChange={handleChange} />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditarProyecto;

