import './style/listarUsuario.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ListarUsuario = () => {
  const [error, setError] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [showMenu, setShowMenu] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          setError('Token no disponible');
          console.error('Token no disponible');
          return;
        }

        const response = await axios.get('http://localhost:666/api/usuarios/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.data) {
          throw new Error('Error al obtener los usuarios');
        }

        setUsuarios(response.data);
        // Inicializar el estado showMenu para cada usuario
        const initialShowMenuState = {};
        response.data.forEach(usuario => {
          initialShowMenuState[usuario.usuario_id] = false;
        });
        setShowMenu(initialShowMenuState);
      } catch (error) {
        setError('Hubo un problema al obtener los usuarios');
        console.error('Error:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const toggleMenu = (usuario_id) => {
    setShowMenu((prev) => {
      const updatedShowMenu = { ...prev };
      updatedShowMenu[usuario_id] = !updatedShowMenu[usuario_id];
      return updatedShowMenu;
    });
  };

  const openModal = (usuario) => {
    setUsuarioToDelete(usuario);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUsuarioToDelete(null);
  };

  const handleDelete = async () => {
    if (usuarioToDelete) {
      try {
        const token = Cookies.get('token');
        if (!token) {
          setError('Token no disponible');
          console.error('Token no disponible');
          return;
        }

        await axios.delete(`http://localhost:666/api/usuario/${usuarioToDelete.usuario_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUsuarios((prev) => prev.filter((usuario) => usuario.usuario_id !== usuarioToDelete.usuario_id));
        closeModal();
      } catch (error) {
        setError('Hubo un problema al eliminar el usuario');
        console.error('Error al eliminar el usuario:', error);
      }
    }
  };

  const renderUsuarios = () => {
    return usuarios.map((usuario) => (
      <div className='tarjeta-show-users' key={usuario.usuario_id}>
        <button className='menu-button-show-users' onClick={() => toggleMenu(usuario.usuario_id)}>
          ▼
        </button>
        <div className='tarjeta-content-show-users'>
          {usuario.email} <br /> {usuario.nombre} <br /> {usuario.rol}
        </div>
        {showMenu[usuario.usuario_id] && (
          <div className='menu-show-users'>
            <ul className='menu-list-show-users'>
              <li className='menu-item-show-users' onClick={() => openModal(usuario)}>Eliminar</li>
            </ul>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className='tarjetas-lista-usuario-show-users'>
      {renderUsuarios()}
      {modalIsOpen && (
        <div className='modal-overlay-show-users'>
          <div className='modal-show-users'>
            <h2>Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a {usuarioToDelete?.nombre}?</p>
            <div className='modal-buttons-show-users'>
              <button className='confirm-delete-button-show-users' onClick={handleDelete}>Sí, eliminar</button>
              <button className='cancel-button-show-users' onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarUsuario;
