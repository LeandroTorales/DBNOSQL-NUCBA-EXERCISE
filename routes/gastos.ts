import { Router } from "express";
import { createGasto, getGastosDeUsuario } from "../controllers/gastos";

export const routerGastos = Router();

routerGastos.post("/", createGasto);
routerGastos.get("/:dniUser", getGastosDeUsuario);
