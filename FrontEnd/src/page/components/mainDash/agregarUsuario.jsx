import React from "react";
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AgregarUsuario(){
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [date, setDate] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  const handleOptionClick = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  const handleSave = async () => {
    if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
    }

    try {
        const responseToken = await fetch('http://localhost:666/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!responseToken.ok) {
            throw new Error('Error al obtener el token');
        }

        const { token } = await responseToken.json();

        const response = await fetch('http://localhost:666/api/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user, name, password, email, rol, date })
        });

        if (!response.ok) {
            throw new Error('Error al guardar el usuario');
        }

        // Manejo de la respuesta, por ejemplo, redirigir a la lista de usuarios
        navigate('/listausuario');
    } catch (error) {
        setError('Hubo un problema al guardar el usuario');
        console.error('Error:', error);
    }
};

  return (
    <div className="formulario-agregar-usuario">
      <div>
        <input type="text" placeholder="Ingrese su user" value={user}onChange={(e) => setUser(e.target.value)}/>
        <select value={rol}onChange={(e)=> setRol(e.target.value)}>
          <option value="usuario">usuario</option>
          <option value="administrados">Administrador</option>
        </select>
        <input type="email" placeholder="Ingrese su correo" value={email}onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Valide su contraseña" value={confirmPassword}onChange={(e) => setConfirmPassword(e.target.value)}/>
        <input type="date" value={date}onChange={(e)=> setDate(e.target.value)}/>
      </div>
      <div>
        <input type="text" placeholder="Ingrese su nombre" value={name}onChange={(e) => setName(e.target.value)}/>
        <input type="password" placeholder="Ingrese su contraseña" value={password}onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSave}>Guardar</button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AgregarUsuario;
