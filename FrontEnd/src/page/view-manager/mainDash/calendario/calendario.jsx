import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style/calendario.css'; // Asegúrate de importar tu archivo CSS personalizado
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment);

const TareasCalendar = () => {
  const [tareas, setTareas] = useState([]);
  const [reuniones, setReuniones] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState(null);

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
        descripcion: reunion.descripcion, // Incluir la descripción
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

  const openConfirmation = (message, callback) => {
    setConfirmationMessage(message);
    setConfirmationCallback(() => callback);
    setIsConfirmationOpen(true);
    setModalIsOpen(false);

  };

  const handleSelect = async ({ start, end }) => {
    const title = window.prompt('Ingrese el nombre de la reunión:');
    const descripcion = window.prompt('Ingrese la descripción de la reunión:');
    if (!title || !descripcion) return;
    const token = Cookies.get('token');
    try {
      const fecha_inicio = moment(start).format('YYYY-MM-DD HH:mm:ss');
      const fecha_fin = moment(end).format('YYYY-MM-DD HH:mm:ss');

      await axios.post('http://localhost:666/api/meeting', {
        nombre: title,
        descripcion,
        fecha_inicio,
        fecha_fin
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

  const handleDelete = () => {
    const { id, title } = selectedMeeting;
    setConfirmationMessage(`¿Está seguro de eliminar la reunión "${title}"?`);
    setConfirmationCallback(async () => {
      const token = Cookies.get('token');
      try {
        await axios.delete(`http://localhost:666/api/meeting/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessage('Reunión eliminada exitosamente');
        // Actualiza las reuniones después de eliminar una
        fetchReuniones();
        closeModal(); // Cierra el modal al confirmar la eliminación
      } catch (error) {
        setMessage('Error al eliminar la reunión');
        console.error('Error deleting meeting:', error);
      }
    });
    setIsConfirmationOpen(true); // Abre el modal de confirmación
  };
    
  const handleEdit = async () => {
    const token = Cookies.get('token');
    const { id, title, descripcion, start, end } = selectedMeeting;
    const nombre = window.prompt('Ingrese el nuevo nombre de la reunión:', title);
    const nuevaDescripcion = window.prompt('Ingrese la nueva descripción de la reunión:', descripcion);
    const nuevaFechaInicio = window.prompt('Ingrese la nueva fecha de inicio de la reunión:', moment(start).format('YYYY-MM-DD HH:mm:ss'));
    const nuevaFechaFin = window.prompt('Ingrese la nueva fecha de fin de la reunión:', moment(end).format('YYYY-MM-DD HH:mm:ss'));

    if (!nombre || !nuevaDescripcion || !nuevaFechaInicio || !nuevaFechaFin) return;

    try {
      await axios.put('http://localhost:666/api/meeting', {
        reunion_id: id,
        nombre,
        descripcion: nuevaDescripcion,
        fecha_inicio: nuevaFechaInicio,
        fecha_fin: nuevaFechaFin
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Reunión editada exitosamente');
      // Actualiza las reuniones después de editar una
      fetchReuniones();
      closeModal();
    } catch (error) {
      setMessage('Error al editar la reunión');
      console.error('Error editing meeting:', error);
    }
  };

  const handleSelectEvent = (event) => {
    if (event.type !== 'meeting') return; // Solo abre el modal para reuniones
    setSelectedMeeting(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMeeting(null);
  };

  const ConfirmationCard = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="confirmation-card">
        <div className="confirmation-message">{message}</div>
        <div className="confirmation-buttons">
          <button className="confirm-button" onClick={onConfirm}>Confirmar</button>
          <button className="cancel-button" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    );
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
        views={['month', 'week', 'day']}
        step={15}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        components={{
          event: EventComponent
        }}
      />
      {selectedMeeting && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detalles de la reunión"
          ariaHideApp={false}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        >
          <h2>{selectedMeeting.title}</h2>
          <p>Descripción: {selectedMeeting.descripcion}</p>
          <p>Inicio: {moment(selectedMeeting.start).format('YYYY-MM-DD HH:mm:ss')}</p>
          <p>Fin: {moment(selectedMeeting.end).format('YYYY-MM-DD HH:mm:ss')}</p>
          <button onClick={() => openConfirmation(`¿Está seguro de eliminar la reunión "${selectedMeeting.title}"?`, handleDelete)}>Eliminar</button>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={closeModal}>Cerrar</button>
        </Modal>
      )}
      {isConfirmationOpen && (
        <ConfirmationCard
          message={confirmationMessage}
          onConfirm={() => {
            confirmationCallback(); // Ejecuta la función de eliminación
            setIsConfirmationOpen(false);
          }}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      )}
    </div>
  );
};

export default TareasCalendar;
