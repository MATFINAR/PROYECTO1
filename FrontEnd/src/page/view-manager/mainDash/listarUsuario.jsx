import "./style/listarUsuario.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './style/listarUsuario.css';

const ShowUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    mostrarUsuarios();
  }, []);

  const mostrarUsuarios = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:666/api/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setError('Error al obtener usuarios');
    }
  };

  const buscarUsuario = async () => {
    try {
      if (busqueda.trim() === '') {
        mostrarUsuarios();
        return;
      }

      const token = Cookies.get('token');
      const response = await axios.get(`http://localhost:666/api/usuario/${busqueda}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setUsuarios(response.data);
    
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      setError('Error al buscar usuario');
    }
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    setError(''); // Clear error when user types
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarUsuario();
  };

  const handleDelete = async (usuario_id) => {
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (confirmar) {
      try {
        const token = Cookies.get('token');
        await axios.delete(`http://localhost:666/api/usuario/${usuario_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        mostrarUsuarios();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        setError('Error al eliminar usuario');
      }
    }
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar usuario por ID"
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      <div className="cards-container">
        {error && <p className="error">{error}</p>}
        {usuarios.map((usuario) => (
          <div key={usuario.usuario_id} className="card">
            <h3 className="card-title">{usuario.nombre}</h3>
            <p className="card-description">{usuario.email}</p>
            <p className="card-description">{usuario.rol}</p>
            <button className="delete-button" onClick={() => handleDelete(usuario.usuario_id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowUsers;
