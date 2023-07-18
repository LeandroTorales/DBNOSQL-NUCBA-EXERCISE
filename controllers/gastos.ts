import { Request, Response } from "express";
import { Gasto, InterfaceGastos } from "../models/gastos";
import { Usuario } from "../models/usuario";

export const createGasto = async (req: Request, res: Response) => {
  const gastoInformation: InterfaceGastos = req.body;

  const { dniTitularDeGasto, importe } = gastoInformation;

  if (!dniTitularDeGasto || !importe) {
    res.json({
      msj: "Faltan datos necesarios para le petición",
    });
    return;
  }

  const findUser = await Usuario.findOne({ dni: dniTitularDeGasto });

  if (!findUser) {
    res.json({
      msj: "Parece que quieres asignar un gasto a un usuario no existente.",
    });
    return;
  }

  const newGasto = new Gasto({
    dniTitularDeGasto: dniTitularDeGasto,
    fechaDeGasto: new Date(),
    importe: importe,
    objectIdUser: findUser?._id,
  });

  await newGasto.save();

  //ACTUALIZA EL ARRAY DE GASTOS DE LOS USUARIOS CON EL ID DE LOS GASTOS QUE SE VAN CREANDO, SEGUIDO, LO ACTUALIZA EN LA BASE DE DATOS.

  const arrUserGastosActualizado = [...findUser.gastos, newGasto._id];
  console.log("arrUserGastos:", arrUserGastosActualizado);

  const gastosUpdateUser = await Usuario.findOneAndUpdate(
    { dni: dniTitularDeGasto },
    { gastos: arrUserGastosActualizado },
    { new: true }
  );

  res.json({
    msj: "Todo parece correcto, el gasto que se registro es el siguiente",
    newGasto,
    gastosUpdateUser,
  });
};

export const getGastosDeUsuario = async (req: Request, res: Response) => {
  const { dniUser } = req.params;

  const userPopulate = await Usuario.findOne({ dni: dniUser }).populate("gastos");

  res.json({
    msj: "Estos son los gastos del usuario",
    userPopulate,
  });
};
