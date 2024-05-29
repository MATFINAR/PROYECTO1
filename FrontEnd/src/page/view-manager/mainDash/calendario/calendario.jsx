import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import './style/calendario.css';  // Importa el archivo CSS personalizado

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:666/api/mostrarTareasCalendario');
        const tasks = response.data.map(task => ({
          title: task.nombre,
          start: new Date(task.fecha_inicio),
          end: new Date(task.fecha_final)
        }));
        setEvents(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Nuevo evento:');
    if (title) {
      const newEvent = { start, end, title };
      setEvents([...events, newEvent]);
      // Optionally, save the new event to the backend here.
    }
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-header">Calendario Grande</h1>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="month"
        style={{ height: 500 }}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default Calendario;
