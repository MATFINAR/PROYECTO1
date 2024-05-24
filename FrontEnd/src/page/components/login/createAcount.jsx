import "../../../style/agregarUsuario.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaSave } from "react-icons/fa";
import axios from 'axios';

function CreateAcount() {
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

    // Verificar si algún campo obligatorio está vacío
    if (!user || !name || !password || !email) {
      setError('Campos vacíos');
      return;
    }

    // Verificar que el email contenga "@" y al menos un carácter después del "@"
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailPattern.test(email)) {
      setError('Correo inválido');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:666/api/usuario', { user, name, password, email, rol, date });

      navigate('/');
    } catch (error) {
      if (error.response && error.response.data.error) {
        if (error.response.data.error.includes('usuario')) {
          setError('Usuario ya existente');
        } else if (error.response.data.error.includes('email')) {
          setError('Correo ya existente');
        } else {
          setError(error.response.data.error || 'Error al guardar el usuario');
        }
      } else {
        setError(`Hubo un problema al guardar el usuario: ${error.message}`);
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="content-loggin">
      <div className="content-info-loggin">
        <div className="logo-loggin"></div>
        <div className="info-loggin">
          <span>"Del sueño a la realidad, un proyecto a la vez: Tu visión, nuestro impulso"</span>
        </div>
      </div>
      <div className="content-create-acount">
        <div className="formulario-agregar-usuario">
          <div className="content-left">
            <input
              type="text"
              placeholder="Ingrese su usuario"
              name="user"
              value={formData.user}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Ingrese su correo"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <button className="guardar-agregar-usuario" onClick={handleSave}><FaSave />Guardar</button>
            {error && <div className="error">{error}</div>}
          </div>
          <div className="content-right">
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
            <input
              type="password"
              placeholder="Valide su contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAcount;
