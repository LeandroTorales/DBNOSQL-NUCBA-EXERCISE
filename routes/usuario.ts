import { Router } from "express";
import { createUsuario } from "../controllers/usuarios";

export const routerUsuarios = Router();

routerUsuarios.post("/", createUsuario);
