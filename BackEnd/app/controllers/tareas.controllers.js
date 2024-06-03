import { pool } from '../config/bd-mysql.js';
import { getCurrentDateTime } from '../util/dateHelper.js';

export const showTasks = async (req, res) => {
  const { proyecto_nombre } = req.query;

  try {
    let resultado;

    if (proyecto_nombre) {
      resultado = await pool.query('SELECT * FROM tareas WHERE proyecto_nombre = ?', [proyecto_nombre]);
    } else {
      resultado = await pool.query('SELECT * FROM tareas');
    }

    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error en la consulta Get de tareas' });
  }
};

export const getTask = async (req, res) => {
  const { nombre } = req.params;

  try {
    const resultado = await pool.query('SELECT * FROM tareas WHERE nombre = ?', [nombre]);
    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, type: 'Get' });
  }
};


export const postTask = async (req, res) => {
  const { nombre, descripcion, estado, fecha_limite, proyecto_nombre } = req.body;
  const date_create = getCurrentDateTime(); // Asegúrate de que esta función devuelva la fecha y hora actual en el formato adecuado

  try {
    const resultado = await pool.query(
      'INSERT INTO tareas (nombre, descripcion, estado, fecha_limite, proyecto_nombre) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, estado, fecha_limite, proyecto_nombre]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Tarea creada exitosamente' });
    } else {
      res.json({ resultado: 'Tarea no creada' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al crear tarea' });
  }
};

export const putTask = async (req, res) => {
  const { nombre, descripcion, estado, fecha_limite, proyecto_nombre, nombreAntiguo } = req.body;

  try {
    const resultado = await pool.query(
      `UPDATE tareas SET 
      nombre = ?, 
      descripcion = ?, 
      estado = ?, 
      fecha_limite = ?, 
      proyecto_nombre = ?
      WHERE nombre = ?`,
      [nombre, descripcion, estado, fecha_limite, proyecto_nombre, nombreAntiguo]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Tarea actualizada exitosamente' });
    } else {
      res.json({ resultado: 'Tarea no actualizada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al actualizar tarea' });
  }
};

export const delTask = async (req, res) => {
  const { nombre } = req.params;

  try {
    const resultado = await pool.query('DELETE FROM tareas WHERE nombre = ?', [nombre]);

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Tarea eliminada exitosamente' });
    } else {
      res.json({ resultado: 'Tarea no eliminada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al eliminar tarea' });
  }
};