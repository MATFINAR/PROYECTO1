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
    manager_email: '',
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
      setError('Error al obtener datos del proyecto');
      console.error('Error al obtener datos del proyecto:', error);
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
        setError('Error al actualizar proyecto: ' + response.data.resultado);
      }
    } catch (error) {
      setError('Error al actualizar proyecto');
      console.error('Error al actualizar proyecto:', error);
    }
  };

  return (
    <div className="container-actualizar-proyecto">
      <h2 className="heading-actualizar-proyecto">Editando Proyecto: {proyecto.nombreAnterior}</h2>
      <form className="form-actualizar-proyecto" onSubmit={handleSubmit}>
        <div className="form-group-actualizar-proyecto">
          <label className="label-actualizar-proyecto">Nombre del proyecto que desea actualizar:</label>
          <input
            type="text"
            name="nombreAnterior"
            value={proyecto.nombreAnterior}
            onChange={handleChange}
            required
            className="input-actualizar-proyecto"
          />
          <button type="button" onClick={handleBuscarProyecto} className="button-actualizar-proyecto">Buscar Proyecto</button>
        </div>
        <div className="form-group-actualizar-proyecto">
          <label className="label-actualizar-proyecto">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={proyecto.nombre}
            onChange={handleChange}
            required
            className="input-actualizar-proyecto"
          />
        </div>
        <div className="form-group-actualizar-proyecto">
          <label className="label-actualizar-proyecto">Descripción:</label>
          <texproyecto
            name="descripcion"
            value={proyecto.descripcion}
            onChange={handleChange}
            className="texproyecto-actualizar-proyecto"
          ></texproyecto>
        </div>
        <div className="form-group-actualizar-proyecto">
          <label className="label-actualizar-proyecto">Estado:</label>
          <select
            name="estado"
            value={proyecto.estado}
            onChange={handleChange}
            required
            className="select-actualizar-proyecto"
          >
            <option value="">Seleccionar estado</option>
            <option value="Sin comenzar">Sin comenzar</option>
            <option value="En proceso">En proceso</option>
            <option value="Completo">Completo</option>
          </select>
        </div>
        <div className="form-group-actualizar-proyecto">
          <label className="label-actualizar-proyecto">Prioridad:</label>
          <select
            name="prioridad"
            value={proyecto.prioridad}
            onChange={handleChange}
            required
            className="select-actualizar-proyecto"
          >
            <option value="">Seleccionar prioridad</option>
            <option value="No importa">No importa</option>
            <option value="Importancia baja">Importancia baja</option>
            <option value="Importancia media">Importancia media</option>
            <option value="Importancia alta">Importancia alta</option>
          </select>
        </div>
        <div className="form-group-actualizar-proyecto">
          <label className="label-actualizar-proyecto">Email del manager:</label>
          <input
            type="text"
            name="manager_email"
            value={proyecto.manager_email}
            onChange={handleChange}
            required
            className="input-actualizar-proyecto"
          />
        </div>
        <button type="submit" className="button-actualizar-proyecto">Guardar Cambios</button>
      </form>
      {error && <p className="error-actualizar-proyecto">{error}</p>}
    </div>
  );
};

export default UpdateProject;
