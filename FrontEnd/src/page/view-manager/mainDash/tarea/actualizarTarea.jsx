import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const UpdateTask = () => {
  const navigate = useNavigate();
  const [tarea, setTarea] = useState({
    NombreAnterior: '',
    ID_Proyecto: '',
    Nombre: '',
    Descripcion: '',
    FechaInicio: '',
    FechaFin: '',
    Estado: '',
  });
  const [error, setError] = useState('');

  const handleBuscarTarea = async () => {
    const token = Cookies.get('token');

    try {
      const response = await axios.get(`http://localhost:666/api/task/${tarea.NombreAnterior}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.length > 0) {
        setTarea({
          ...response.data[0],
          NombreAnterior: response.data[0].Nombre,
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
      const verifyResponse = await axios.get(`http://localhost:666/api/task/${tarea.Nombre}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (verifyResponse.data.length > 0 && verifyResponse.data[0].Nombre !== tarea.NombreAnterior) {
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
      <h2>Editando Tarea: {tarea.NombreAnterior}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre anterior de la tarea:
          <input
            type='text'
            name='NombreAnterior'
            value={tarea.NombreAnterior}
            onChange={handleChange}
            required
          />
        </label>
        <button type='button' onClick={handleBuscarTarea}>Buscar Tarea</button>
        <label>
          ID del Proyecto:
          <input
            type='text'
            name='ID_Proyecto'
            value={tarea.ID_Proyecto}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nombre:
          <input
            type='text'
            name='Nombre'
            value={tarea.Nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name='Descripcion'
            value={tarea.Descripcion}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Fecha de inicio:
          <input
            type='date'
            name='FechaInicio'
            value={tarea.FechaInicio}
            onChange={handleChange}
          />
        </label>
        <label>
          Fecha de fin:
          <input
            type='date'
            name='FechaFin'
            value={tarea.FechaFin}
            onChange={handleChange}
          />
        </label>
        <label>
          Estado:
          <select 
            name='Estado'
            value={tarea.Estado}
            onChange={handleChange}
          >
            <option value=''></option>
            <option value='Pendiente'>Pendiente</option>
            <option value='En curso'>En curso</option>
            <option value='Completada'>Completada</option>
          </select>
        </label>
        <button type='submit'>Guardar Cambios</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateTask;