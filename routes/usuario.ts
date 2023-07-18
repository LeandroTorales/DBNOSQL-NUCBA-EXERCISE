import { Router } from "express";
import { createUsuario, getUsuario } from "../controllers/usuarios";

export const routerUsuarios = Router();

routerUsuarios.post("/", createUsuario);
routerUsuarios.get("/:dniUser", getUsuario);
