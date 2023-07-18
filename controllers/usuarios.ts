import { Request, Response } from "express";
import { InterfaceUsuario, Usuario } from "../models/usuario";

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

  const newUsuario = new Usuario({
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    gastos: [],
  });
  await newUsuario.save();

  res.json({
    msj: "Se ha creado el usuario correctamente",
    usuarioInformation,
  });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { dniUser } = req.params;

  if (!dniUser) {
    res.json({
      msj: "Se nesecita un dni pasado por parametro de url para continuar",
    });
    return;
  }

  const findUser = await Usuario.findOne({ dni: dniUser });

  res.json({
    msj: "Este es el usuario que se encontró",
    findUser,
  });
};
