import "./style/tareas.css";
import React, { useState } from 'react';
import ShowTasks from "./tarea/mostrarTareas";
import CreateTask from "./tarea/crearTareas";
import UpdateTask from "./tarea/actualizarTarea";

function Tareas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
    setIsSidebarOpen(false); // Cierra el menú
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='content-tarea'>
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-buttons">
        <button className="toggle-button" onClick={toggleSidebar}>
          &#9776;
        </button>
        {isSidebarOpen && (
          <>
            <button onClick={() => openModal(<CreateTask />)}>Crear Tarea</button>
            <button onClick={() => openModal(<UpdateTask />)}>Actualizar Tarea</button>
          </>
        )}
      </div>
    </div>
    <div className='main-content'>
      <div className='show-tareas'>
        <ShowTasks />
      </div>
      {modalVisible && (
        <div className="modal-tarea">
          <div className="modal-content-tarea">
            <span className="close" onClick={closeModal}>&times;</span>
            {modalContent}
          </div>
        </div>
      )}
    </div>
  </div>

  );
};

export default Tareas;