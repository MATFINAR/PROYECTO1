import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const tokenSign = (data) => {
  return jwt.sign({
    usuario_id: data.usuario_id,
    email: data.email,
    rol: data.rol,
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEEXPIRED,
  });
}

export const validarPermiso = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(403).json({
        error: "No tiene permiso para acceder",
        token: "Token inválido"
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          error: "No tiene permiso para acceder",
          token: "Token inválido"
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      token: "Error al procesar el token"
    });
  }
};
