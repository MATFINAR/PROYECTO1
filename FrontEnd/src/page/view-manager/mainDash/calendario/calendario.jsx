import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style/calendario.css'; // Asegúrate de importar tu archivo CSS personalizado
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';

const localizer = momentLocalizer(moment);

const TareasCalendar = () => {
  const [tareas, setTareas] = useState([]);
  const [reuniones, setReuniones] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTareas = async () => {
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
        allDay: true,
        type: 'task' // Agregar un atributo 'type' para identificar las tareas
      }));
      setTareas(tasks);
    } catch (error) {
      setMessage('Error al obtener las tareas');
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchReuniones = async () => {
    const token = Cookies.get('token');
    if (!token) {
      setMessage('Token no disponible');
      console.error('Token no disponible');
      return;
    }
    try {
      const response = await axios.get('http://localhost:666/api/meetings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const reuniones = response.data.map(reunion => ({
        id: reunion.reunion_id,
        title: reunion.nombre,
        start: new Date(reunion.fecha_inicio),
        end: new Date(reunion.fecha_fin),
        type: 'meeting' // Agregar un atributo 'type' para identificar las reuniones
      }));
      setReuniones(reuniones);
    } catch (error) {
      setMessage('Error al obtener las reuniones');
      console.error('Error fetching reuniones:', error);
    }
  };

  useEffect(() => {
    fetchTareas();
    fetchReuniones();
  }, []);

  const handleSelect = async ({ start, end }) => {
    const title = window.prompt('Ingrese el nombre de la reunión:');
    if (!title) return;
    const token = Cookies.get('token');
    try {
      const fecha_inicio = moment(start).format('YYYY-MM-DD HH:mm:ss');
      const fecha_fin = moment(end).format('YYYY-MM-DD HH:mm:ss');
      
      await axios.post('http://localhost:666/api/meeting', {
        nombre: title,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Reunión creada exitosamente');
      // Actualiza las reuniones después de crear una nueva
      fetchReuniones();
    } catch (error) {
      setMessage('Error al crear la reunión');
      console.error('Error creating meeting:', error);
    }
  };

  const handleDelete = async (event) => {
    if (event.type !== 'meeting') return; // Solo elimina reuniones
    const confirmDelete = window.confirm(`¿Está seguro de eliminar la reunión "${event.title}"?`);
    if (!confirmDelete) return;
    const token = Cookies.get('token');
    try {
      await axios.delete(`http://localhost:666/api/meeting/${event.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Reunión eliminada exitosamente');
      // Actualiza las reuniones después de eliminar una
      fetchReuniones();
    } catch (error) {
      setMessage('Error al eliminar la reunión');
      console.error('Error deleting meeting:', error);
    }
  };

  const EventComponent = ({ event }) => {
    const isTask = event.type === 'task';
    const eventStyle = {
      backgroundColor: isTask ? '#f0ad4e' : '#5bc0de',
      color: '#fff',
      borderRadius: '5px',
      padding: '1px 10px', // Ajustar el padding para que sea más visible
      cursor: 'pointer'
    };
  
    return (
      <div style={eventStyle}>
        {event.title}
      </div>
    );
  };
  
  return (
    <div>
      {message && <p>{message}</p>}
      <Calendar
        localizer={localizer}
        events={[...tareas, ...reuniones]}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 440 }}
        views={['month', 'week', 'day']} // Mostrar vistas de mes, semana y día
        step={15} // Incremento de 15 minutos para las horas
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleDelete}
        components={{
          event: EventComponent // Usar el componente personalizado para renderizar los eventos
        }}
      />
    </div>
  );
};

export default TareasCalendar;
