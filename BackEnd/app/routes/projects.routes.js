import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delProject, getProject, postProject, putProject, showProject } from "../controllers/proyectos.controllers.js";
const routerProjects = Router();

routerProjects.get("/projects", validarPermiso, showProject);
routerProjects.get("/project/:Nombre", validarPermiso, getProject);
routerProjects.post("/project", validarPermiso, postProject);
routerProjects.put('/project', validarPermiso, putProject);
routerProjects.delete("/project/:Nombre",  validarPermiso, delProject);

export default routerProjects;