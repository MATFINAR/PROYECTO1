import '../../../style/listarUsuario.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarUsuario = () => {
  const [error, setError] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:666/api/usuario/');
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

  const renderUsuarios = () => {
    return usuarios.map((usuario) => (
      <div className='targeta' key={usuario.id}>
        {usuario.email} <br/> {usuario.name} <br/> {usuario.rol}
      </div>
    ));
  };

  return (
    <div className='targetas-lista-usuario'>
      {renderUsuarios()}
    </div>
  );
}

export default ListarUsuario;
