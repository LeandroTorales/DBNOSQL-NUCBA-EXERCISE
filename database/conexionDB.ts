import mongoose from "mongoose";
export const conexionDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      "mongodb+srv://LeandroTorales:kfwsPc3dz2IxfwaZ@cluster01leandro.p5chgx8.mongodb.net/"
    );
    console.log("Se pudo conectar bien a la base de datos");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos");
    throw error;
  }
};
