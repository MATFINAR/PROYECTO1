import "../style/tareas.css";
import React, { useState } from 'react';
import ShowTasks from "./tarea/mostrarTareas";
import CreateTask from "./tarea/crearTareas";
import UpdateTask from "./tarea/actualizarTarea";


function Tareas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className='content-tarea'>
      <div className='botones-tarea'>
        <button onClick={() => openModal(<CreateTask />)}>Crear Tarea</button>
        <button onClick={() => openModal(<UpdateTask />)}>Actualizar Tarea</button>
      </div>
      <div className='reforma-tarea'>
        <ShowTasks />
        {modalVisible && (
          <div className="modal-tarea">
            <div className="modal-content-tarea">
              <span className="close" onClick={closeModal}>&times;</span>
              {modalContent }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tareas;