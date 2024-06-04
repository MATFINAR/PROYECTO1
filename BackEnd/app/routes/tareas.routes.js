import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delTask, getTask, postTask, putTask, showTasks } from "../controllers/tareas.controllers.js";
const routerTasks = Router();

routerTasks.get("/tasks", validarPermiso, showTasks );
routerTasks.get("/task/:nombre", validarPermiso, getTask);
routerTasks.post("/task", validarPermiso, postTask);
routerTasks.put("/task", validarPermiso, putTask);
routerTasks.delete("/task/:nombre", validarPermiso, delTask);

export default routerTasks;