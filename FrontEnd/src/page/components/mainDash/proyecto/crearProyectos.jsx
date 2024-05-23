import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
  const [Nombre, setNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [FechaInicio, setFechaInicio] = useState('');
  const [FechaFin, setFechaFin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    const token = Cookies.get('token');
    
    if (!token) {
      setError('No tiene permiso para acceder');
      return;
    }

    try {
      const response = await fetch('http://localhost:666/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ Nombre, Descripcion, FechaInicio, FechaFin })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === "Proyecto creado exitosamente") {
          setSuccess(data.message);
          setError('');
        } else {
          setError(data.message || 'Error al crear proyecto');
          setSuccess('');
        }
      } else {
        setError(data.message || 'Error al crear proyecto');
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
      <h1>Crear Proyecto</h1>
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
      <button onClick={handleCreateProject}>Crear Proyecto</button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
}

export default CreateProject;