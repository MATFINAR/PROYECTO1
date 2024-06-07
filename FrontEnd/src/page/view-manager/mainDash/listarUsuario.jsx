import './style/listarUsuario.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TbSquareArrowDownFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const ShowUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState('');
  const [eliminarVisible, setEliminarVisible] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    mostrarUsuarios();
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.rol);
    }
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
      setError(''); 
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

      if (response.data.length === 0) {
        setError('Usuario no encontrado');
        setUsuarios([]);
      } else {
        setUsuarios(response.data);
        setError('');
      }
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      setError('Usuario no encontrado');
    }
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    setError(''); 

    if (event.target.value.trim() === '') {
      mostrarUsuarios();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarUsuario();
  };

  const handleDeleteClick = (usuario) => {
    if (eliminarVisible === usuario.usuario_id) {
      setEliminarVisible(null);
      setUsuarioAEliminar(null);
    } else {
      setEliminarVisible(usuario.usuario_id);
      setUsuarioAEliminar(usuario);
      setConfirmacionVisible(false); 
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = Cookies.get('token');
      const usuarioLogueado = jwtDecode(token);

      await axios.delete(`http://localhost:666/api/usuario/${usuarioAEliminar.usuario_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      mostrarUsuarios();
      setEliminarVisible(null);
      setUsuarioAEliminar(null);
      setConfirmacionVisible(false);

      if (usuarioAEliminar.usuario_id === usuarioLogueado.usuario_id) {
        Cookies.remove('token');
        Cookies.remove('email');
        navigate('/');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setError('Error al eliminar usuario');
    }
  };

  return (
    <div className="container-listar-usuario">
      <form className="search-form-listar-usuario" onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar usuario por nombre"
          className="search-input-listar-usuario"
        />
        <button type="submit" className="search-button-listar-usuario">Buscar</button>
      </form>

      <div className="cards-container-listar-usuario">
        {error && <p className="error-listar-usuario">{error}</p>}
        {usuarios.length === 0 && !error && <p className="error-listar-usuario">Usuario no encontrado</p>}
        {usuarios.map((usuario) => (
          <div key={usuario.usuario_id} className="card-listar-usuario">
            <div className="card-header">
              <h3 className="card-title">{usuario.nombre}</h3>
              {userRole === 'Manager' && ( 
                <div className="delete-menu">
                  {eliminarVisible === usuario.usuario_id && (
                    <div className="delete-menu-options">
                      <button className="delete-user-button" onClick={() => setConfirmacionVisible(true)}>Eliminar usuario</button>
                    </div>
                  )}
                  <button className="delete-button" onClick={() => handleDeleteClick(usuario)}>
                    <TbSquareArrowDownFilled />
                  </button>
                </div>
              )}
            </div>
            <p className="card-description">{usuario.email}</p>
            <p className="card-description">{usuario.rol}</p>
          </div>
        ))}
      </div>

      {confirmacionVisible && (
        <div className="confirmacion-overlay">
          <div className="confirmacion-box">
            <p>{`¿Está seguro de que desea eliminar al usuario ${usuarioAEliminar.nombre}?`}</p>
            <button onClick={handleDeleteUser}>Confirmar</button>
            <button onClick={() => setConfirmacionVisible(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowUsers;
