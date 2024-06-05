import { Router } from 'express'
import { validarPermiso } from '../middlewares/usuarios.middlewares.js';
import { delReunion, postReunion, putReunion, showReuniones } from '../controllers/reuniones.controller.js';

const routerMeeting = Router();


routerMeeting.get("/meetings", validarPermiso, showReuniones);
routerMeeting.post("/meeting", validarPermiso, postReunion);
routerMeeting.put("/meeting/:reunion_id", validarPermiso, putReunion);
routerMeeting.delete("/meeting/:reunion_id", validarPermiso, delReunion);

export default routerMeeting;