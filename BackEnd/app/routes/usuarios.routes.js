import { Router } from "express";
import { loginUser, UserList, getUser, postUser, putUser, putRolle, deleteUser } from "../controllers/usuarios.controllers.js";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
const routerUser = Router();

routerUser.post("/login", loginUser);

routerUser.get("/usuarios", validarPermiso, UserList);
routerUser.get("/usuario", getUser)
routerUser.post("/usuario",postUser);
routerUser.put("/usuario", validarPermiso, putUser);
routerUser.put("/usuario/rol", validarPermiso,putRolle);
routerUser.delete("/usuario/:id", validarPermiso, deleteUser);


export default routerUser;
