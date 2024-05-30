import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style/calendario.css'; // Asegúrate de importar tu archivo CSS personalizado
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie'

const localizer = momentLocalizer(moment);

const TareasCalendar = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setMessage('Token no disponible');
        console.error('Token no disponible');
        return;
      }
      try {
        const response = await axios.get('http://localhost:666/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const tasks = response.data.map(task => ({
          id: task.tarea_id,
          title: task.nombre,
          start: new Date(task.fecha_limite),
          end: new Date(task.fecha_limite),
          allDay: true
        }));
        setEvents(tasks);
      } catch (error) {
        setMessage('Error al obtener las tareas');
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {message && <p>{message}</p>}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default TareasCalendar;
