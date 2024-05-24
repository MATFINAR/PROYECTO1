import { Router } from "express";

import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delProject, getProject, postProject, putProject, showProject } from "../controllers/proyectos.controllers.js";
const routerProjects = Router();

routerProjects.get("/project/:id", validarPermiso, getProject);
routerProjects.get("/projects", validarPermiso, showProject);
routerProjects.post("/projects", validarPermiso, postProject);
routerProjects.put("/projects",  validarPermiso, putProject);
routerProjects.delete("/projects",  validarPermiso, delProject);

export default routerProjects;