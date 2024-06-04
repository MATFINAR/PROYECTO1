import { Router } from 'express'
import { validarPermiso } from '../middlewares/usuarios.middlewares.js';
import { delReunion, getReunion, postReunion, putReunion, showReuniones } from '../controllers/reuniones.controller.js';

const routerMeeting = Router();


routerMeeting.get("/meetings", validarPermiso, showReuniones);
routerMeeting.get("/meeting/:nombre", validarPermiso, getReunion);
routerMeeting.post("/meeting", validarPermiso, postReunion);
routerMeeting.put("/meeting", validarPermiso, putReunion);
routerMeeting.delete("/meeting/:nombre", validarPermiso, delReunion);

export default routerMeeting;