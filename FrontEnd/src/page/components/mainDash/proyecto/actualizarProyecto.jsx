import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
      const response = await fetch(`http://localhost:666/api/projects/${proyecto.NombreAnterior}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project data');
      }

      const data = await response.json();
      setProyecto({ ...data, NombreAnterior: data.Nombre });
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
      const response = await fetch('http://localhost:666/api/projects', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proyecto),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const data = await response.json();
      if (data.resultado === "Proyecto actualizado exitosamente") {
        navigate('/dash'); // Redirige al dashboard
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
          Nombre Anterior:
          <input type="text" name="NombreAnterior" value={proyecto.NombreAnterior} onChange={handleChange} required />
        </label>
        <button type="button" onClick={handleBuscarProyecto}>Buscar Proyecto</button>
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