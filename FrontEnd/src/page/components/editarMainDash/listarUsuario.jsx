import '../../../style/listarUsuario.css'
import React, { useState, useEffect } from 'react';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

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
    const tarjetas = [];
    for (let i = 0; i < usuarios.length; i++) {
      tarjetas.push(
        <div className='targeta' key={usuarios[i].id}>
          {usuarios[i].name} <br/> {usuarios[i].email}
        </div>
      );
    }
    return tarjetas;
  };

  return (
    <div className='targetas-lista-usuario'>
      {renderUsuarios()}
    </div>
  );
};

export default ListarUsuarios;
