import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delTask, getTask, postTask, putTask, showTasks } from "../controllers/tareas.controllers.js";
const routerTareas = Router();

routerTareas.get("/tasks", validarPermiso, showTasks );
routerTareas.get("/task/:nombre", validarPermiso, getTask);
routerTareas.post("/task", validarPermiso, postTask);
routerTareas.put("/task", validarPermiso, putTask);
routerTareas.delete("/task/:nombre", validarPermiso, delTask);

export default routerTareas;