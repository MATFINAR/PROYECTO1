import "../../../style/proyectos.css"
import React, { useState } from 'react';
import ShowProjects from "./proyecto/buscarProyectos";
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
    <div className='content-tareas'>
      <div className='botones-tareas'>
        <button onClick={() => openModal(<ShowProjects />)}>Buscar Proyectos</button>
        <button onClick={() => openModal(<CreateProject />)}>Crear Proyecto</button>
        <button onClick={() => openModal(<UpdateProject />)}>Actualizar Proyecto</button>
        <button onClick={() => openModal("Eliminar Proyecto")}>Eliminar Proyecto</button>
      </div>
      <div className='reforma-proyecto'>
        {modalVisible && (
          <div className="modal-proyecto">
            <div className="modal-content-proyecto">
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