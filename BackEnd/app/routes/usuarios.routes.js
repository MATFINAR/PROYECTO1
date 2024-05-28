import { Router } from "express";
import { loginUser, UserList, getUser, postUser, putUser, putRolle, deleteUser, deleteMyUser, getExistUser } from "../controllers/usuarios.controllers.js";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
const routerUser = Router();

routerUser.post("/login", loginUser);

routerUser.get("/usuarios", validarPermiso, UserList);
routerUser.get("/usuario", validarPermiso, getUser);
routerUser.get("/usuario/existe", validarPermiso, getExistUser)
routerUser.post("/usuario", postUser);
routerUser.put("/usuario", validarPermiso, putUser);
routerUser.put("/usuario/rol", validarPermiso,putRolle);
routerUser.delete("/usuario/:usuario_id", validarPermiso, deleteUser);
routerUser.delete("/usuario", validarPermiso, deleteMyUser);


export default routerUser;
