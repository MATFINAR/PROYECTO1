import express from 'express';
import { Router } from 'express';
import cookieParser from 'cookie-parser';

/**
 * !Importaciones de las rutas de los Usuarios
 */
import routerUser from './usuarios.routes.js';
import routerProjects from './projects.routes.js';
import routerTareas from './tareas.routes.js';
import routerAsignaciones from './asignaciones.routes.js';
import routerToken from './token.routes.js';

const app = express();
const route = Router(); // Crea una instancia de Router

// Configura cookie-parser
app.use(cookieParser());
route.use("/api", routerTareas)
route.use("/api", routerUser);
route.use("/api", routerProjects);
route.use("/api", routerAsignaciones);
route.use("/api", routerToken)

export default route;
