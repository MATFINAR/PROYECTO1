import "../style/dashBoard.css"

export const DashBoard=()=>{
    return(
        <div className="content-dashboard">
            <div className="header-dashboard">
                <div className="logo1-dashboard"></div>
                <div className="setting-dashboard"></div>
                <div className="user-dashboard"></div>
            </div>
            <div className="aside-dashboard">
                <button>Calendario</button>
                <button>Lista de usuario</button>
                <button>Agregar Usuario</button>
                <button>Poryectos</button>
                <button>Tareas</button>
            </div>
            <div className="main-dashboard"></div>
        </div>    
        )
}