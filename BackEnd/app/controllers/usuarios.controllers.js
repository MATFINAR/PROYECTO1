import { pool } from "../config/bd-mysql.js";
import { tokenSign } from "../middlewares/usuarios.middlewares.js";
import { getCurrentDateTime } from "../util/dateHelper.js";

// Listar todos los usuarios
export const UserList = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM Usuarios");
    res.json(resultado[0]);
  } catch (error) {
    res.json({ error: error.message, type: "Get" });
  }
};
// Obtener un usuario por ID
export const getUser = async (req, res) => {
  const { nombre } = req.params;

  try {
    const resultado = await pool.query(`SELECT * FROM Usuarios WHERE nombre = ?`, [nombre]);
    res.json(resultado[0]);
  } catch (error) {
    res.json({ error: error.message, type: "Get" });
  }
};

export const getExistUser = async (req, res) => {
  const email = req.query.email;

  try {
    const [respuesta] = await pool.query('SELECT COUNT(*) AS count FROM usuarios WHERE email = ?', [email]);

    if (respuesta[0].count > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Registrar un nuevo usuario
export const postUser = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  const rol = "usuario"

  try {
    const [resultado] = await pool.query(
      "INSERT INTO Usuarios (nombre, email, contrasena, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, contrasena, rol]
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
  const { usuario_id, nombre, email, contrasena, rol_id } = req.body;
  const date_create = getCurrentDateTime();

  try {
    const [resultado] = await pool.query(
      "UPDATE Usuarios SET nombre = ?, email = ?, contrasena = ?, rol_id = ? WHERE usuario_id = ?",
      [nombre, email, contrasena, rol_id, usuario_id]
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

export const deleteMyUser = async (req, res) => {
  const { email } = req.user;

  try {
    const [resultado] = await pool.query("DELETE FROM Usuarios WHERE email = ?", [email]);

    if (resultado.affectedRows > 0) {
      res.json({ resultado: "Usuario eliminado exitosamente" });
    } else {
      res.json({ resultado: "Usuario no eliminado" });
    }
  } catch (error) {
    res.json({ error: error.message, type: "Delete" });
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
  const { email, contrasena } = req.body;

  try {
    const [resultado] = await pool.query("SELECT * FROM Usuarios WHERE email = ? AND contrasena = ?", [email, contrasena]);
    const usuario = resultado[0];

    if (!usuario) {
      res.status(401).json({ respuesta: "Usuario o contrasena incorrecto", estado: false });
    } else {
      const token = tokenSign({ email, usuario_id: usuario.usuario_id });
      res.json({ respuesta: "Login correcto", estado: true, token, usuario_id: usuario.usuario_id });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error en el login', resultado: "Error en el login" });
  }
};
