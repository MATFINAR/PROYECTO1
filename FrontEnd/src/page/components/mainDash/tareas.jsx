import React, { useState } from 'react';
import CrearUsuario from '../login/crearUsuario.jsx';
import "../../../style/proyectos.css"

function Proyectos() {
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
        <button onClick={() => openModal("Buscar Proyectos")}>Buscar Proyectos</button>
        <button onClick={() => openModal("Crear Proyecto")}>Crear Proyecto</button>
        <button onClick={() => openModal("Actualizar Proyecto")}>Actualizar Proyecto</button>
        <button onClick={() => openModal("Eliminar Proyecto")}>Eliminar Proyecto</button>
      </div>
      <div className='reforma-tareas'>
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              {modalContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proyectos;