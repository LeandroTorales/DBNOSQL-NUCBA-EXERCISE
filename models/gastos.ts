import { Model, ObjectId, Schema, model } from "mongoose";

export interface InterfaceGastos {
  fechaDeGasto: Date;
  dniTitularDeGasto: number;
  importe: number;
  objectIdUser: ObjectId;
}

const gastoSchema = new Schema<InterfaceGastos>({
  fechaDeGasto: {
    type: Date,
  },
  dniTitularDeGasto: {
    type: Number,
    required: true,
  },
  importe: {
    type: Number,
    required: true,
  },
  objectIdUser: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
  },
});

export const Gasto: Model<InterfaceGastos> = model<InterfaceGastos>("Gastos", gastoSchema);
