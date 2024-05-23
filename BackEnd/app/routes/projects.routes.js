import { Router } from "express";

import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delProject, getProject, postProject, showProject } from "../controllers/proyectos.controllers.js";
import { putUser } from "../controllers/usuarios.controllers.js";
const routerProjects = Router();

routerProjects.get("/project/:id", validarPermiso, getProject);
routerProjects.get("/projects", validarPermiso, showProject);
routerProjects.post("/projects", validarPermiso, postProject);
routerProjects.put("/projects/:id",  validarPermiso, putUser);
routerProjects.delete("/projects/:id",  validarPermiso, delProject);

export default routerProjects;