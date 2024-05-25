import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delTask, getTask, postTask, putTask, showTasks } from "../controllers/tareas.controllers.js";
const routerTareas = Router();

routerTareas.get("/task/:Nombre", validarPermiso, getTask);
routerTareas.get("/tasks", showTasks );
routerTareas.post("/task", validarPermiso, postTask);
routerTareas.put("/task", putTask);
routerTareas.delete("/task/:Nombre", validarPermiso, delTask);

export default routerTareas;