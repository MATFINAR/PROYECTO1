import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ShowProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = Cookies.get('token');
      
      if (!token) {
        setError('No tiene permiso para acceder');
        return;
      }

      try {
        const response = await fetch('http://localhost:666/api/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError('Error: No tiene permiso para acceder o problemas con el servidor.');
        console.error('Error:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
                <td>{project.Nombre}</td>
                <td>{project.Descripcion}</td>
                <td>{new Date(project.FechaInicio).toLocaleDateString()}</td>
                <td>{new Date(project.FechaFin).toLocaleDateString()}</td>
                <td>{new Date(project.date_create).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowProjects;