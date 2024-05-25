import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const CreateTask = () => {
  const [ID_Proyecto, setID_Proyecto] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [FechaInicio, setFechaInicio] = useState('');
  const [FechaFin, setFechaFin] = useState('');
  const [Estado, setEstado] = useState('Pendiente');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateTask = async () => {
    const token = Cookies.get('token');
    
    if (!token) {
      setError('No tiene permiso para acceder');
      return;
    }

    try {
      const response = await axios.post('http://localhost:666/api/task', {
        ID_Proyecto,
        Nombre,
        Descripcion,
        FechaInicio,
        FechaFin,
        Estado
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
        setID_Proyecto('');
        setNombre('');
        setDescripcion('');
        setFechaInicio('');
        setFechaFin('');
        setEstado('Pendiente');
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
    <div>
      <h1>Crear Tarea</h1>
      <input
        type='text'
        placeholder='ID Proyecto'
        value={ID_Proyecto}
        onChange={(e) => setID_Proyecto(e.target.value)}
      />
      <input
        type='text'
        placeholder='Nombre'
        value={Nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type='text'
        placeholder='Descripción'
        value={Descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />    
      <input
        type='date'
        placeholder='Fecha de Inicio'
        value={FechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
      />
      <input
        type='date'
        placeholder='Fecha de Fin'
        value={FechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
      />
      <select 
        name='Estado'
        value={Estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        <option value='Pendiente'>Pendiente</option>
        <option value='En curso'>En curso</option>
        <option value='Completada'>Completada</option>
      </select>
      <button onClick={handleCreateTask}>Crear Tarea</button>
      {error && <div className='error-message'>{error}</div>}
      {success && <div className='success-message'>{success}</div>}
    </div>
  );
}

export default CreateTask;