import express from 'express';
import { Router } from 'express';
import cookieParser from 'cookie-parser';

/**
 * !Importaciones de las rutas de los Usuarios
 */
import routerUsers from './usuarios.routes.js';
import routerProjects from './proyectos.routes.js';
import routerTasks from './tareas.routes.js';
import routerMeeting from './reuniones.routes.js';

const app = express();
const route = Router(); // Crea una instancia de Router

// Configura cookie-parser
app.use(cookieParser());

route.use("/api", routerTasks)
route.use("/api", routerUsers);
route.use("/api", routerProjects);
route.use("/api", routerMeeting)

export default route;
