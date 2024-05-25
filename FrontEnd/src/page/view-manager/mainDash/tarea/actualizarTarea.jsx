import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const EditarTarea = () => {
  const navigate = useNavigate();
  const [tarea, setTarea] = useState({
    ID_Proyecto: '',
    Nombre: '',
    Descripcion: '',
    FechaInicio: '',
    FechaFin: '',
    Estado: '',
    NombreAnterior: '',
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

      setTarea({ ...response.data, NombreAnterior: response.data.Nombre });
    } catch (error) {
      setError('Error al obtener datos de la tarea');
      console.error('Error:', error);
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
      const response = await axios.put('http://localhost:666/api/task', tarea, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.resultado === "Tarea actualizada exitosamente") {
        window.location.reload(); // Recarga la página
      } else {
        setError('Error al actualizar tarea');
      }
    } catch (error) {
      setError('Error al actualizar tarea');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Editando Tarea: {tarea.NombreAnterior}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la tarea que desea actualizar:
          <input type="text" name="NombreAnterior" value={tarea.NombreAnterior} onChange={handleChange} required />
        </label>
        <label>
          ID Proyecto:
          <input type="text" name="ID_Proyecto" value={tarea.ID_Proyecto} onChange={handleChange} required />
        </label>
        <label>
          Nombre:
          <input type="text" name="Nombre" value={tarea.Nombre} onChange={handleChange} required />
        </label>
        <label>
          Descripción:
          <textarea name="Descripcion" value={tarea.Descripcion} onChange={handleChange}></textarea>
        </label>
        <label>
          Fecha de inicio:
          <input type="date" name="FechaInicio" value={tarea.FechaInicio} onChange={handleChange} />
        </label>
        <label>
          Fecha de fin:
          <input type="date" name="FechaFin" value={tarea.FechaFin} onChange={handleChange} />
        </label>
        <select 
        name='Estado'
        value={tarea.Estado}
        onChange={handleChange}
      >
        <option value="Pendiente">Pendiente</option>
        <option value="En curso">En curso</option>
        <option value="Completada">Completada</option>
      </select>
        <button type="button" onClick={handleBuscarTarea}>Buscar Tarea</button>
        <button type="submit">Guardar Cambios</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditarTarea;