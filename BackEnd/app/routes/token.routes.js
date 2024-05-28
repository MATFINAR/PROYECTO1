import { Router } from 'express'
import { putToken } from '../controllers/token.controller.js'
import { validarPermiso } from '../middlewares/usuarios.middlewares.js';

const routerToken = Router();

routerToken.post("/token", validarPermiso, putToken);

export default routerToken;