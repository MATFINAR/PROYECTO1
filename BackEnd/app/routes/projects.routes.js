import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delProject, getProject, postProject, putManager, putProject, showProject } from "../controllers/proyectos.controllers.js";
const routerProjects = Router();

routerProjects.get("/proyectos", validarPermiso, showProject);
routerProjects.get("/proyecto/:nombre", validarPermiso, getProject);
routerProjects.post("/proyecto", validarPermiso, postProject);
routerProjects.put("/proyecto", validarPermiso, putProject);
routerProjects.put("/proyecto/:manager_id", putManager);
routerProjects.delete("/proyecto/:nombre",  validarPermiso, delProject);

export default routerProjects;