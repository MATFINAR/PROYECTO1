import '../../../style/listarUsuario.css';
import React, { useState, useEffect } from 'react';

const ListarUsuario = () => {
  const [error, setError] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:666/api/usuario/');
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
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
