import "../style/callBack.css"
export default function Page404() {
  return (
    <div className="content-callback">
      <div className="page-callback">
        <h1>This is fine... But... 404</h1>
        <p>Lo siento, la página que estás buscando no se pudo encontrar.</p>
        <div className="button-callback">
          <button >
            <a href="http://localhost:3000/" className="boton-callback">Volver al inicio</a>
          </button>
        </div>
      </div>
    </div>
  );
}
