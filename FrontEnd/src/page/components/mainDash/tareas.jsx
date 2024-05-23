import React, { useState } from 'react';
import "../../../style/tareas.css"

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
    <div className='content-tareas'>
      <div className='botones-tareas'>
        <button onClick={() => openModal("Buscar Tareas")}>Buscar Tareas</button>
        <button onClick={() => openModal("Crear Tareas")}>Crear Tareas</button>
        <button onClick={() => openModal("Actualizar Tareas")}>Actualizar Tareas</button>
        <button onClick={() => openModal("Eliminar Tareas")}>Eliminar Tareas</button>
      </div>
      <div className='reforma-tarea'>
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