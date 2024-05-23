import React, { useState } from 'react';
import Cookies from 'js-cookie';

function UpdateProject() {
  const [projectName, setProjectName] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [FechaInicio, setFechaInicio] = useState('');
  const [FechaFin, setFechaFin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearchProject = async () => {
    const token = Cookies.get('token');

    try {
      const response = await fetch(`http://localhost:666/api/projects?nombre=${projectName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error fetching project');
      }

      const data = await response.json();
      if (data.length === 0) {
        throw new Error('Project not found');
      }

      const project = data[0]; // Tomamos el primer proyecto encontrado (si hay varios con el mismo nombre)
      if (!Nombre) setNombre(project.Nombre);
      if (!Descripcion) setDescripcion(project.Descripcion);
      if (!FechaInicio) setFechaInicio(project.FechaInicio);
      if (!FechaFin) setFechaFin(project.FechaFin);
      setError('');
    } catch (error) {
      setError('Error fetching project data');
      console.error('Error:', error);
    }
  };

  const handleUpdateProject = async () => {
    const token = Cookies.get('token');
    
    if (!token) {
      setError('No tiene permiso para acceder');
      return;
    }

    try {
      const response = await fetch(`http://localhost:666/api/projects/${projectName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ Nombre, Descripcion, FechaInicio, FechaFin })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError('');
      } else {
        setError(data.message || 'Error al actualizar proyecto');
        setSuccess('');
      }
    } catch (error) {
      setError('Error: No tiene permiso para acceder o problemas con el servidor.');
      console.error('Error:', error);
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Actualizar Proyecto</h1>
      <input
        type="text"
        placeholder="Nombre del Proyecto a Actualizar"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        onBlur={handleSearchProject}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={Nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={Descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="date"
        placeholder="Fecha de Inicio"
        value={FechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
      />
      <input
        type="date"
        placeholder="Fecha de Fin"
        value={FechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
      />
      <button onClick={handleUpdateProject}>Actualizar Proyecto</button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
}

export default UpdateProject;