import { Request, Response } from "express";
import { InterfaceUsuario, Usuario } from "../models/usuario";
import { Gasto } from "../models/gastos";

export const createUsuario = async (req: Request, res: Response) => {
  const usuarioInformation: InterfaceUsuario = req.body;
  const { dni, nombre, apellido } = usuarioInformation;

  if (!dni || !nombre || !apellido) {
    res.json({
      msj: "Faltan datos en la peticion, recuerda que debe tener un DNI, nombre, y apellido",
    });
    return;
  }

  const existenciaDeUsuario = await Usuario.findOne({ dni: dni }, { new: true });

  if (existenciaDeUsuario) {
    res.json({
      msj: "Parece que existe el usuario. Recuerda que el DNI tiene que ser único",
    });
    return;
  }

  const findGastosObjectID = await Gasto.findOne({ dniTitularDeGasto: dni }, { new: true });

  const newUsuario = new Usuario({
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    gastos: findGastosObjectID?._id,
  });
  await newUsuario.save();

  res.json({
    msj: "Se ha creado el usuario correctamente",
    usuarioInformation,
    gastos: findGastosObjectID?._id,
  });
};
