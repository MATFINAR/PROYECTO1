import "../style/loggin.css"

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Loggin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:666/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      if (data.token) {
        Cookies.set('token', data.token); // Guarda el token en una cookie
        navigate('/dashboard'); // Redirige al dashboard
      } else {
        throw new Error('No token generated');
      }
    } catch (error) {
      setError('Error: Credenciales incorrectas o problemas con el servidor.');
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
      <div className="logging-loggin">
        <div className="registro-loggin">
          <input
            type="email"
            className="email-loggin"
            placeholder="INGRESE SU EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="password-loggin"
            placeholder="INGRESE SU CONTRASEÑA"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="singUp-loggin" onClick={handleLogin}>INGRESAR</button>
          {error && <div className="error-message">{error}</div>}
          <button className="create-loggin">CREA UNA NUEVA CUENTA</button>
          <a href="" className="help-loggin">
            <div>¿OLVIDASTE TU CONTRASEÑA?</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Loggin;
