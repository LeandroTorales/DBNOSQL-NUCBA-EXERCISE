import { Model, ObjectId, Schema, model } from "mongoose";

export interface InterfaceUsuario {
  dni: number;
  nombre: string;
  apellido: string;
  gastos: [ObjectId];
}

const usuarioSchema = new Schema<InterfaceUsuario>({
  dni: {
    type: Number,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  gastos: {
    type: Schema.Types.ObjectId,
    ref: "gastos",
  },
});

export const Usuario: Model<InterfaceUsuario> = model<InterfaceUsuario>("Usuarios", usuarioSchema);
