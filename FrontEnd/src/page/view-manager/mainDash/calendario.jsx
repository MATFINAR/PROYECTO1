import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style/calendario.css';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [tareas, setTareas] = useState([]);
  const [reuniones, setReuniones] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState(null);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    descripcion: '',
    start: null,
    end: null
  });
  const [isEdit, setIsEdit] = useState(false);

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
        type: 'task'
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
        descripcion: reunion.descripcion,
        type: 'meeting'
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
    setIsEdit(false);
    setNewMeeting({
      ...newMeeting,
      start: start,
      end: end
    });
    setModalIsOpen(true);
  };

  const handleCreateOrEdit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    try {
      let resultado;
      if (isEdit) {
        resultado = await axios.put(`http://localhost:666/api/meeting/${newMeeting.id}`, {
          nombre: newMeeting.title,
          descripcion: newMeeting.descripcion,
          fecha_inicio: moment(newMeeting.start).format('YYYY-MM-DD HH:mm:ss'),
          fecha_fin: moment(newMeeting.end).format('YYYY-MM-DD HH:mm:ss')
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessage('Reunión editada exitosamente');
      } else {
        resultado = await axios.post('http://localhost:666/api/meeting', {
          nombre: newMeeting.title,
          descripcion: newMeeting.descripcion,
          fecha_inicio: moment(newMeeting.start).format('YYYY-MM-DD HH:mm:ss'),
          fecha_fin: moment(newMeeting.end).format('YYYY-MM-DD HH:mm:ss')
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessage('Reunión creada exitosamente');
      }
      if (resultado.data.resultado === 'Reunión actualizada exitosamente' || resultado.data.resultado === 'Reunión creada exitosamente') {
        fetchReuniones();
        closeModal();
      } else {
        setMessage('Error al crear/editar la reunión');
      }
    } catch (error) {
      setMessage('Error al crear/editar la reunión');
      console.error('Error creating/editing meeting:', error);
    }
  };
    
  const handleDelete = () => {
    if (!selectedMeeting) {
      console.error('selectedMeeting is null');
      return;
    }
  
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
        fetchReuniones();
        closeModal(); // Cierra el modal al confirmar la eliminación
      } catch (error) {
        setMessage('Error al eliminar la reunión');
        console.error('Error deleting meeting:', error);
      }
    });
    setIsConfirmationOpen(true); // Abre el modal de confirmación
  };
      
  const handleEdit = (event) => {
    if (event.type !== 'meeting') return;
    setIsEdit(true);
    const { id, title, descripcion, start, end } = event;
    setNewMeeting({
      id,
      title,
      descripcion,
      start,
      end
    });
    setModalIsOpen(true);
  };
  
  const handleSelectEvent = (event) => {
    if (event.type !== 'meeting') return;
    setSelectedMeeting(event); // Set selectedMeeting here
    handleEdit(event);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMeeting(null);
    setNewMeeting({
      title: '',
      descripcion: '',
      start: null,
      end: null
    });
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

    const eventTitle = event.title || ''; 

      return (
        <div style={eventStyle} onClick={() => handleEdit(event)}>
        {eventTitle}
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
        style={{ minHeight: 440, position: 'relative', zIndex: 999 }}
        views={['month', 'week', 'day']}
        step={15}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        components={{
          event: EventComponent
        }}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles de la reunión"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#333',
            color: '#d4af37',
            borderRadius: '10px',
            padding: '20px',
            zIndex: 1001
          }
        }}
      >
        <h2 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '20px' }}>{isEdit ? 'Editar Reunión' : 'Crear Reunión'}</h2>
        <form onSubmit={handleCreateOrEdit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="title" style={{ color: '#d4af37', marginBottom: '10px' }}>Título:</label>
          <input
            type="text"
            id="title"
            value={newMeeting.title}
            onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
            required
            style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #d4af37', backgroundColor: '#444' }}
          />
          <label htmlFor="descripcion" style={{ color: '#d4af37', marginBottom: '10px' }}>Descripción:</label>
          <textarea
            id="descripcion"
            value={newMeeting.descripcion}
            onChange={(e) => setNewMeeting({ ...newMeeting, descripcion: e.target.value })}
            required
            style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #d4af37', backgroundColor: '#444' }}
          />
          <label htmlFor="start" style={{ color: '#d4af37', marginBottom: '10px' }}>Inicio:</label>
          <input
            type="datetime-local"
            id="start"
            value={newMeeting.start ? moment(newMeeting.start).format('YYYY-MM-DDTHH:mm') : ''}
            onChange={(e) => setNewMeeting({ ...newMeeting, start: e.target.value })}
            required
            style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #d4af37', backgroundColor: '#444' }}
          />
          <label htmlFor="end" style={{ color: '#d4af37', marginBottom: '10px' }}>Fin:</label>
          <input
            type="datetime-local"
            id="end"
            value={newMeeting.end ? moment(newMeeting.end).format('YYYY-MM-DDTHH:mm') : ''}
            onChange={(e) => setNewMeeting({ ...newMeeting, end: e.target.value })}
            required
            style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #d4af37', backgroundColor: '#444' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={{ padding: '5px', borderRadius: '5px', border: 'none', backgroundColor: '#d4af37', color: '#333', cursor: 'pointer' }}>{isEdit ? 'Guardar Cambios' : 'Crear'}</button>
            <button type="button" onClick={closeModal} style={{ padding: '5px', borderRadius: '5px', border: 'none', backgroundColor: '#d4af37', color: '#333', cursor: 'pointer' }}>Cancelar</button>
            {isEdit && <button type="button" onClick={handleDelete} style={{ padding: '5px', borderRadius: '5px', border: 'none', backgroundColor: '#d4af37', color: '#333', cursor: 'pointer' }}>Eliminar</button>}
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isConfirmationOpen}
        onRequestClose={() => setIsConfirmationOpen(false)}
        contentLabel="Confirmación"
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#333',
            color: '#d4af37',
            borderRadius: '10px',
            padding: '20px',
            width: '300px'
          }
        }}
      >
        <ConfirmationCard
          message={confirmationMessage}
          onConfirm={() => {
            if (confirmationCallback) confirmationCallback();
            setIsConfirmationOpen(false);
          }}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Calendario;