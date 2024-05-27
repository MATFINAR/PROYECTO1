import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const UpdateTask = () => {
  const [tarea, setTarea] = useState({
    nombreAntiguo: '',
    nombre: '',
    descripcion: '',
    estado: '',
    fecha_limite: '',
    proyecto_id: ''
  });
  const [error, setError] = useState('');

  const handleBuscarTarea = async () => {
    const token = Cookies.get('token');

    try {
      const response = await axios.get(`http://localhost:666/api/task/${tarea.nombreAntiguo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.length > 0) {
        setTarea({
          ...response.data[0],
          nombreAntiguo: response.data[0].nombre,
        });
      } else {
        setError('Tarea no encontrada');
      }
    } catch (error) {
      setError('Error fetching task data');
      console.error('Error fetching task data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarea((prevTarea) => ({
      ...prevTarea,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    try {
      // Verificar si el nombre de la tarea ya existe
      const verifyResponse = await axios.get(`http://localhost:666/api/task/${tarea.nombre}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (verifyResponse.data.length > 0 && verifyResponse.data[0].nombre !== tarea.nombreAntiguo) {
        setError('El nombre de la tarea ya existe');
        return;
      }

      // Actualizar la tarea
      const response = await axios.put('http://localhost:666/api/task', tarea, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.resultado === 'Tarea actualizada exitosamente') {
        window.location.reload(); // Recargar la página después de actualizar la tarea
      } else {
        setError('Error updating task: ' + response.data.resultado);
      }
    } catch (error) {
      setError('Error updating task');
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h1>Actualizar Tarea</h1>
      <input
        type='text'
        placeholder='Nombre de la tarea'
        value={tarea.nombreAntiguo}
        name='nombreAntiguo'
        onChange={handleChange}
      />
      <button onClick={handleBuscarTarea}>Buscar Tarea</button>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nombre'
          value={tarea.nombre}
          name='nombre'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Descripcion'
          value={tarea.descripcion}
          name='descripcion'
          onChange={handleChange}
        />
        <select
          value={tarea.estado}
          name='estado'
          onChange={handleChange}
        >
          <option value='Sin completar'>Sin completar</option>
          <option value='Completa'>Completa</option>
        </select>
        <input
          type='date'
          placeholder='Fecha Limite'
          value={tarea.fecha_limite}
          name='fecha_limite'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Proyecto ID'
          value={tarea.proyecto_id}
          name='proyecto_id'
          onChange={handleChange}
        />
        <button type='submit'>Actualizar Tarea</button>
      </form>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};

export default UpdateTask;
