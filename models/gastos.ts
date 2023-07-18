import { Model, Schema, model } from "mongoose";

export interface InterfaceGastos {
  fechaDeGasto: Date;
  dniTitularDeGasto: number;
  importe: number;
}

const gastoSchema = new Schema<InterfaceGastos>({
  fechaDeGasto: {
    type: Date,
    required: true,
  },
  dniTitularDeGasto: {
    type: Number,
    required: true,
  },
  importe: {
    type: Number,
    required: true,
  },
});

export const Gasto: Model<InterfaceGastos> = model<InterfaceGastos>("Gastos", gastoSchema);
