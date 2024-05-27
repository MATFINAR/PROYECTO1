import "./style/actualizarProyecto.css"
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const UpdateProject = () => {
  const [proyecto, setProyecto] = useState({
    nombreAnterior: '',
    nombre: '',
    descripcion: '',
    estado: '',
    prioridad: '',
    manager_id: '',
  });
  const [error, setError] = useState('');

  const handleBuscarProyecto = async () => {
    const token = Cookies.get('token');

    try {
      const response = await axios.get(`http://localhost:666/api/proyecto/${proyecto.nombreAnterior}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.length > 0) {
        setProyecto({
          ...response.data[0],
          nombreAnterior: response.data[0].nombre,
        });
      } else {
        setError('Proyecto no encontrado');
      }
    } catch (error) {
      setError('Error fetching project data');
      console.error('Error fetching project data:', error);
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
      // Verificar si el nombre del proyecto ya existe
      const verifyResponse = await axios.get(`http://localhost:666/api/proyecto/${proyecto.nombre}`, {
        headers: {  
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (verifyResponse.data.length > 0 && verifyResponse.data[0].nombre !== proyecto.nombreAnterior) {
        setError('El nombre del proyecto ya existe');
        return;
      }

      // Actualizar el proyecto
      const response = await axios.put('http://localhost:666/api/proyecto', proyecto, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.resultado === "Proyecto actualizado exitosamente") {
        window.location.reload(); // Navegar a la página de proyectos
      } else {
        setError('Error updating project: ' + response.data.resultado);
      }
    } catch (error) {
      setError('Error updating project');
      console.error('Error updating project:', error);
    }
  };

    return (
      <div className="container-actualizar-tarea">
        <h2 className="heading-actualizar-tarea">Editando Proyecto: {proyecto.nombreAnterior}</h2>
        <form className="form-actualizar-tarea" onSubmit={handleSubmit}>
          <div className="form-group-actualizar-tarea">
            <label className="label-actualizar-tarea">Nombre del proyecto que desea actualizar:</label>
            <input
              type="text"
              name="nombreAnterior"
              value={proyecto.nombreAnterior}
              onChange={handleChange}
              required
              className="input-actualizar-tarea"
            />
            <button type="button" onClick={handleBuscarProyecto} className="button-actualizar-tarea">Buscar Proyecto</button>
          </div>
          <div className="form-group-actualizar-tarea">
            <label className="label-actualizar-tarea">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={proyecto.nombre}
              onChange={handleChange}
              required
              className="input-actualizar-tarea"
            />
          </div>
          <div className="form-group-actualizar-tarea">
            <label className="label-actualizar-tarea">Descripción:</label>
            <textarea
              name="descripcion"
              value={proyecto.descripcion}
              onChange={handleChange}
              className="textarea-actualizar-tarea"
            ></textarea>
          </div>
          <div className="form-group-actualizar-tarea">
            <label className="label-actualizar-tarea">Estado:</label>
            <select
              name="estado"
              value={proyecto.estado}
              onChange={handleChange}
              required
              className="select-actualizar-tarea"
            >
              <option value="">Seleccionar estado</option>
              <option value="Sin comenzar">Sin comenzar</option>
              <option value="En proceso">En proceso</option>
              <option value="Completo">Completo</option>
            </select>
          </div>
          <div className="form-group-actualizar-tarea">
            <label className="label-actualizar-tarea">Prioridad:</label>
            <select
              name="prioridad"
              value={proyecto.prioridad}
              onChange={handleChange}
              required
              className="select-actualizar-tarea"
            >
              <option value="">Seleccionar prioridad</option>
              <option value="No importa">No importa</option>
              <option value="Importancia baja">Importancia baja</option>
              <option value="Importancia media">Importancia media</option>
              <option value="Importancia alta">Importancia alta</option>
            </select>
          </div>
          <div className="form-group-actualizar-tarea">
            <label className="label-actualizar-tarea">Manager ID:</label>
            <input
              type="text"
              name="manager_id"
              value={proyecto.manager_id}
              onChange={handleChange}
              required
              className="input-actualizar-tarea"
            />
          </div>
          <button type="submit" className="button-actualizar-tarea">Guardar Cambios</button>
        </form>
        {error && <p className="error-actualizar-tarea">{error}</p>}
      </div>
    );
    
};

export default UpdateProject;
