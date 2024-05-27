import { pool } from "../config/bd-mysql.js";
import { tokenSign } from "../middlewares/usuarios.middlewares.js";
import { getCurrentDateTime } from "../util/dateHelper.js";

// Obtener un usuario por ID
export const getUser = async (req, res) => {
  const { id } = req.body;

  try {
    const [resultado] = await pool.query("SELECT * FROM Usuarios WHERE usuario_id = ?", [id]);
    res.json(resultado[0]);
  } catch (error) {
    res.json({ error: error.message, type: "Get" });
  }
};

// Listar todos los usuarios
export const UserList = async (req, res) => {
  try {
    const [resultado] = await pool.query("SELECT * FROM Usuarios");
    res.json(resultado);
  } catch (error) {
    res.json({ error: error.message, type: "Get" });
  }
};

// Registrar un nuevo usuario
export const postUser = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  const rol = "usuario"

  try {
    const [resultado] = await pool.query(
      "INSERT INTO Usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, contraseña, rol]
    );

    if (resultado.affectedRows > 0) {
      res.json({ resultado: "Usuario creado exitosamente" });
    } else {
      res.json({ resultado: "Usuario no creado" });
    }
  } catch (error) {
    res.json({ error: error.message, type: "Post" });
  }
};

// Actualizar un usuario existente
export const putUser = async (req, res) => {
  const { usuario_id, nombre, email, contraseña, rol_id } = req.body;
  const date_create = getCurrentDateTime();

  try {
    const [resultado] = await pool.query(
      "UPDATE Usuarios SET nombre = ?, email = ?, contraseña = ?, rol_id = ? WHERE usuario_id = ?",
      [nombre, email, contraseña, rol_id, usuario_id]
    );

    if (resultado.affectedRows > 0) {
      res.json({ resultado: "Usuario actualizado exitosamente" });
    } else {
      res.json({ resultado: "Usuario no actualizado" });
    }
  } catch (error) {
    res.json({ error: error.message, type: "Put" });
  }
};

// Asignar rol a un usuario por correo electrónico
export const putRolle = async (req, res) => {
  const { email, rol } = req.body;

  try {
    const [resultado] = await pool.query(
      "UPDATE Usuarios SET rol = ? WHERE email = ?",
      [rol, email]
    );

    if (resultado.affectedRows === 0) {
      res.json({ mensaje: "Usuario no encontrado" });
    } else {
      res.json({ mensaje: "Usuario actualizado exitosamente" });
    }
  } catch (error) {
    res.json({ error: error.message, type: "Put" });
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const [resultado] = await pool.query("DELETE FROM Usuarios WHERE usuario_id = ?", [usuario_id]);

    if (resultado.affectedRows > 0) {
      res.json({ resultado: "Usuario eliminado exitosamente" });
    } else {
      res.json({ resultado: "Usuario no eliminado" });
    }
  } catch (error) {
    res.json({ error: error.message, type: "Delete" });
  }
};

// Iniciar sesión
export const loginUser = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const [resultado] = await pool.query("SELECT * FROM Usuarios WHERE email = ? AND contraseña = ?", [email, contraseña]);
    const usuario = resultado[0];

    if (!usuario) {
      res.json({ respuesta: "Usuario o contraseña incorrecto", estado: false });
    } else {
      const token = tokenSign({ email, usuario_id: usuario.usuario_id });
      res.json({ respuesta: "Login correcto", estado: true, token });
    }
  } catch (error) {
    res.json({ error: error.message || 'Error en el login', resultado: "Error en el login" });
  }
};