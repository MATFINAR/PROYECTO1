import React, { useState } from 'react';

function Proyectos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className='content-proyectos'>
      <div className='botones-proyectos'>
        <button onClick={() => openModal("Buscar Proyectos")}>Buscar Proyectos</button>
        <button onClick={() => openModal("Crear Proyecto")}>Crear Proyecto</button>
        <button onClick={() => openModal("Actualizar Proyecto")}>Actualizar Proyecto</button>
        <button onClick={() => openModal("Eliminar Proyecto")}>Eliminar Proyecto</button>
      </div>
      <div className='reforma-proyectos'>
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <p>{modalContent}</p>
            </div>
          </div>
      )}
      </div>
    </div>
  );
};

export default Proyectos;

