import { Router } from "express";
import { loginUser, UserList, getUser, postUser, putUser, putRolle, deleteUser, deleteMyUser, getExistUser } from "../controllers/usuarios.controllers.js";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
const routerUsers = Router();

routerUsers.post("/login", loginUser);

routerUsers.get("/usuarios", validarPermiso, UserList);
routerUsers.get("/usuario/:nombre", validarPermiso, getUser);
routerUsers.get("/usuario/existe", validarPermiso, getExistUser)
routerUsers.post("/usuario", postUser);
routerUsers.put("/usuario", validarPermiso, putUser);
routerUsers.put("/usuario/rol", validarPermiso,putRolle);
routerUsers.delete("/usuario/:usuario_id", validarPermiso, deleteUser);
routerUsers.delete("/usuario", validarPermiso, deleteMyUser);


export default routerUsers;
