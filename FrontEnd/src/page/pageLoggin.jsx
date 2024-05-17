import "../style/loggin.css"


function Loggin() {
  return(
    <>
    <div className="content-loggin">
        <div className="content-info-loggin">
            <div className="logo-loggin"></div>
            <div className="info-loggin">
                <span>"Del sueño a la realidad, un proyecto a la vez: Tu visión, nuestro impulso"</span>
            </div>
        </div>
        <div className="logging-loggin">
            <div className="registro-loggin">
                <input type="email" className="email-loggin" placeholder="INGRESE SU EMAIL"/>
                <input type="password" className="password-loggin" placeholder="INGRESE SU CONTRASEÑA"/>
                <button className="singUp-loggin">
                    <a href="http://localhost:3000/dashboard">INGRESAR</a>
                </button>
                <button className="create-loggin">CREAR UNA NUEVA CUANTA</button>
                <div className="help-loggin">
                    <a href="">¿OLVIDASTE TU CONTRASEÑA?</a>
                </div>
            </div>
        </div>
    </div>
    </>
    )
};

export default Loggin;