import "../../../style/asignarRol.css"
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AsignarRango = () => {
  const [formData, setFormData] = useState({ email: '', rol: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) {
      setMessage('Token no disponible');
      console.error('Token no disponible');
      return;
    }
    try {
      const response = await fetch('http://localhost:666/api/usuario/rol/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: formData.email,
          rol: formData.rol,
          id: null,
          user: null,
          name: null,
          password: null
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Error al actualizar el usuario');
      }
    } catch (error) {
      setMessage('Error al actualizar el usuario');
      console.error('Error:', error);
    }
  };

  return (
    <div className="formulario-asignar-rol">
      <form onSubmit={handleSubmit}>
        <div className="asignar-rol">
          <input
            type="email"
            placeholder="Ingrese su correo"
            name="email"
            className="email-rol"
            value={formData.email}
            onChange={handleChange}
          />
          <select
            name="rol"
            className="rol-rol"
            value={formData.rol}
            onChange={handleChange}
          >
            <option value="">Seleccione un rol</option>
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </select>
          <button className="guardar-rol" type="submit">Guardar</button>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default AsignarRango;