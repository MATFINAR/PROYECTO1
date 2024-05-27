import "./style/crearTareas.css"
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const CreateTask = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Sin completar');
  const [fecha_limite, setFecha_limite] = useState('');
  const [proyecto_id, setProyecto_id] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateTask = async () => {

    if (!nombre.trim()) {
      setError("El nombre de la tarea no puede estar vacío")
      return;
    }

    const token = Cookies.get('token');

    if (!token) {
      setError('No tiene permiso para acceder');
      return;
    }

    try {
      const response = await axios.post('http://localhost:666/api/task', {
        nombre,
        descripcion,
        estado,
        fecha_limite,
        proyecto_id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.resultado === 'Tarea creada exitosamente') {
        setSuccess(response.data.resultado);
        setError('');
        window.location.reload();
        // Restablecer los campos del formulario después de una creación exitosa
        setNombre('');
        setDescripcion('');
        setEstado('Sin completar');
        setFecha_limite('');
        setProyecto_id('');
      } else {
        setError(response.data.resultado || 'Error al crear tarea');
        setSuccess('');
      }
    } catch (error) {
      setError('Error: No tiene permiso para acceder o problemas con el servidor.');
      console.error('Error:', error);
      setSuccess('');
    }
  };

  return (
<div className='container-tarea'>
  <h1 className='title-tarea'>Crear Tarea</h1>
  <div className="input-container-tarea">
    <input
      type='text'
      placeholder='Nombre'
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      className='input-nombre-tarea'
    />
  </div>
  <div className="input-container-tarea">
    <input
      type='text'
      placeholder='Descripción'
      value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
      className='input-descripcion-tarea'
    />
  </div>
  <div className="input-container-tarea">
    <select
      value={estado}
      onChange={(e) => setEstado(e.target.value)}
      className='select-estado-tarea'
    >
      <option value='Sin completar'>Sin completar</option>
      <option value='Completa'>Completada</option>
    </select>
  </div>
  <div className="input-container-tarea">
    <span className='label-fecha-limite-tarea'>Fecha limite:</span>
    <input
      type='date'
      placeholder='Fecha de Limite'
      value={fecha_limite}
      onChange={(e) => setFecha_limite(e.target.value)}
      className='input-fecha-limite-tarea'
    />
  </div>
  <div className="input-container-tarea">
    <input
      type='text'
      placeholder='ID Proyecto'
      value={proyecto_id}
      onChange={(e) => setProyecto_id(e.target.value)}
      className='input-proyecto-id-tarea'
    />
  </div>
  <button onClick={handleCreateTask} className='button-crear-tarea'>Crear Tarea</button>
  {error && <div className='error-message'>{error}</div>}
  {success && <div className='success-message'>{success}</div>}
</div>
  );
}

export default CreateTask;