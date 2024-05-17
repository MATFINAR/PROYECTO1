import "../../style/loggin.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:666/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                setError(data.error || 'Error en usuario o contraseña');
            }
        } catch (error) {
            setError('Error de red. No se pudo conectar con el servidor.');
            console.error('Failed to fetch:', error);
        }
    };

    return(
        <>
        <div className="content-loggin">
            <div className="content-info-loggin">
                <div className="logo-loggin"></div>
                <div className="info-loggin">
                    <span>"Del sueño a la realidad, un proyecto a la vez: Tu visión, nuestro impulso"</span>
                </div>
            </div>
            <form onSubmit={handleLogin} className="logging-loggin">
                <div className="registro-loggin">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        required className="email-loggin" placeholder="INGRESE SU EMAIL"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        required className="password-loggin" placeholder="INGRESE SU CONTRASEÑA"/>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button className="singUp-loggin">INGRESAR</button>
                        <button type='submit' className="create-loggin">CREA UNA NUEVA CUENTA</button>
                    <a href="" className="help-loggin">
                        <div>¿OLVIDASTE TU CONTRASEÑA?</div>
                    </a>
                </div>
            </form>
        </div>
        </>
        )
    };
    

export default Login;