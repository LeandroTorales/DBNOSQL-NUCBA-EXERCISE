import express, { Express } from "express";
import { conexionDB } from "../database/conexionDB";

export class Server {
  app: Express;
  constructor() {
    this.app = express();
    this.funcConexionDB();
    this.middlewares();
    this.listen();
    this.routes();
  }

  async funcConexionDB(): Promise<void> {
    await conexionDB();
  }

  middlewares(): void {
    this.app.use(express.json());
  }

  routes(): void {}

  listen(): void {
    this.app.listen(8080, () => {
      console.log("Escuchando desde el puerto 8080");
    });
  }
}
