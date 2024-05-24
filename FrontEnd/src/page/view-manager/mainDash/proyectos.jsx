import "../style/proyectos.css";
import React, { useState } from 'react';
import ShowProjects from "./proyecto/mostrarProyectos";
import CreateProject from "./proyecto/crearProyectos";
import UpdateProject from "./proyecto/actualizarProyecto";


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
    <div className='content-proyecto'>
      <div className='botones-proyecto'>
        <button onClick={() => openModal(<CreateProject />)}>Crear Proyecto</button>
        <button onClick={() => openModal(<UpdateProject />)}>Actualizar Proyecto</button>
      </div>
      <div className='reforma-proyecto'>
        <ShowProjects />
        {modalVisible && (
          <div className="modal-proyecto">
            <div className="modal-content-proyecto">
              <span className="close" onClick={closeModal}>&times;</span>
              {modalContent }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proyectos;