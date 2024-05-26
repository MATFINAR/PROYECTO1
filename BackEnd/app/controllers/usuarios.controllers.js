import { pool } from "../config/bd-mysql.js";
import { tokenSign } from "../middlewares/usuarios.middlewares.js";
import { getCurrentDateTime } from "../util/dateHelper.js ";

export const getUser = async (req, res) => {

  let id = req.body.id;

  try {

    const resultado = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    res.json(resultado[0]);

  } catch (error) {
    res.json({
      "error": error,
      "type": "Get",
    });
  };
};

export const UserList = async (req, res) => {
  
  try {
    
    const resultado = await pool.query("select * from usuarios");
    res.json(resultado[0]);
  
  } catch (error) {
    res.json({
      "error": error,
      "type": "Get",
    });
  };
};

export const postUser = async (req, res) => {
  
  const { user, name, password, email, rol } = req.body;
  const date_create = getCurrentDateTime();

  try {

    const resultado = await pool.query(
      "INSERT INTO usuarios (user, name, password, email, rol, date_create) VALUES (?, ?, ?, ?, ?, ?)",
      [user, name, password, email, rol, date_create]
    );
    
    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: "Usuario creado exitosamente" });
    } else {
      res.json({ resultado: "Usuario no creado" });
    };

  } catch (error) {
    res.json({
      "error": error,
      "type": "Post",
    });
  };
};

export const putUser = async (req, res) => {
  
  const { id, user, name, password, email, rol } = req.body;
  const date_create = getCurrentDateTime();

  try {
    
    const resultado = await pool.query(
      "UPDATE usuarios SET user = ?, name = ?, password = ?, email = ?, rol = ?, date_create = ? WHERE id = ?",
      [user, name, password, email, rol, date_create, id]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: "Usuario actualizado exitosamente" });
    } else {
      res.json({ resultado: "Usuario no actualizado" });
    };

  } catch (error) {
    res.json({
      "error": error,
      "type": "Put",
    });
  };
};

export const putRolle = async (req, res) => {
  const { email, rol } = req.body;
  const date_create = getCurrentDateTime();

  try {
    const resultado = await pool.query(
      "UPDATE usuarios SET rol = ?, date_create = ? WHERE email = ?",
      [rol, date_create, email]
    );

    if (resultado[0].affectedRows === 0) {
      res.json({ mensaje: "Usuario no encontrado" });
    } else {
      res.json({ mensaje: "Usuario actualizado exitosamente" });
    }

  } catch (error) {
    res.json({
      "error": error,
      "type": "Put",
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await pool.query("DELETE FROM usuarios WHERE id =?", [id]);
    
    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: "Usuario eliminado exitosamente" });
    } else {
      res.json({ resultado: "Usuario no eliminado" });
    };

  } catch (error) {
    res.json({ 
      "error": error, 
      "type": "delete" });
  }
};

export const loginUser = async(req, res)=>{
  const email = req.body.email;
  const password = req.body.password;

  try {
      const resultado = await pool.query(`
      SELECT email FROM usuarios
      WHERE email = '${email}' AND password = '${password}'
      `);

      if (resultado.length === 0){
          res.json({
              respuesta:"user o password incorrecto",
              estado:false
          });
      }else{
          const token = tokenSign({
              email:email,
              password:password
          });

          res.json({
              respuesta:"login correcto",
              estado:true,
              token:token
          });
      }
  } catch (error) {
    res.json({
      error: error.message || 'Error en el login',
      resultado: "Error en el login",
    });
  };
};