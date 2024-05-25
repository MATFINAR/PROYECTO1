import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateProject() {
  const [Nombre, setNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [FechaInicio, setFechaInicio] = useState('');
  const [FechaFin, setFechaFin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    if (!Nombre.trim()) {
      setError('El nombre del proyecto no puede estar vacío');
      return;
    }

    const token = Cookies.get('token');
    
    if (!token) {
      setError('No tiene permiso para acceder');
      return;
    }

    try {
      const response = await axios.post('http://localhost:666/api/project', {
        Nombre,
        Descripcion,
        FechaInicio,
        FechaFin
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.resultado === "Proyecto creado exitosamente") {
        setSuccess(response.data.resultado);
        setError('');
        window.location.reload();
      } else {
        setError(response.data.resultado || 'Error al crear proyecto');
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
