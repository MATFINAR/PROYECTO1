import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AgregarUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: '',
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    rol: '',
    date: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    const { user, name, password, confirmPassword, email, rol, date } = formData;

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const token = Cookies.get('token'); // Obtener el token de la cookie

    if (!token) {
      setError('No se encontró el token de autenticación. Por favor, inicie sesión de nuevo.');
      return;
    }

    try {
      const response = await fetch('http://localhost:666/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user, name, password, email, rol, date })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el usuario');
      }

      navigate('/dash/listausuario');
    } catch (error) {
      setError(`Hubo un problema al guardar el usuario: ${error.message}`);
      console.error('Error:', error);
    }
  };

  return (
    <div className="formulario-agregar-usuario">
      <div>
        <input
          type="text"
          placeholder="Ingrese su usuario"
          name="user"
          value={formData.user}
          onChange={handleChange}
        />
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
        >
          <option value="">Seleccione un rol</option>
          <option value="usuario">Usuario</option>
          <option value="administrador">Administrador</option>
        </select>
        <input
          type="email"
          placeholder="Ingrese su correo"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Valide su contraseña"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Ingrese su nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Ingrese su contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Guardar</button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AgregarUsuario;
