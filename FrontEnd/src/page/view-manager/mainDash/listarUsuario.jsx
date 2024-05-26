import '../style/listarUsuario.css';
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
      } catch (error) {
        setError('Hubo un problema al obtener los usuarios');
        console.error('Error:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const toggleMenu = (id) => {
    setShowMenu((prev) => ({ ...prev, [id]: !prev[id] }));
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

        await axios.delete(`http://localhost:666/api/usuario/${usuarioToDelete.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUsuarios((prev) => prev.filter((usuario) => usuario.id !== usuarioToDelete.id));
        closeModal();
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  };

  const renderUsuarios = () => {
    return usuarios.map((usuario) => (
      <div className='tarjeta' key={usuario.id}>
        <button className='menu-button' onClick={() => toggleMenu(usuario.id)}>
          ▼
        </button>
        <div className='tarjeta-content'>
          {usuario.email} <br /> {usuario.name} <br /> {usuario.rol}
        </div>
        {showMenu[usuario.id] && (
          <div className='menu'>
            <ul>
              <li onClick={() => openModal(usuario)}>Eliminar</li>
            </ul>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className='tarjetas-lista-usuario'>
      {renderUsuarios()}
      {modalIsOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a {usuarioToDelete?.name}?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete}>Sí, eliminar</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarUsuario;
