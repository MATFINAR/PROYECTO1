import { pool } from '../config/bd-mysql.js';
import { getCurrentDateTime } from '../util/dateHelper.js';

export const showReuniones = async (req, res) => {
  const { nombre } = req.query;

  try {
    let resultado;

    if (nombre) {
      resultado = await pool.query('SELECT * FROM reuniones WHERE nombre = ?', [nombre]);
    } else {
      resultado = await pool.query('SELECT * FROM reuniones');
    }

    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error en la consulta Get de reuniones' });
  }
};

export const getReunion = async (req, res) => {
  const { reunion_id } = req.params;

  try {
    const resultado = await pool.query('SELECT * FROM reuniones WHERE reunion_id = ?', [reunion_id]);
    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, type: 'Get' });
  }
};

export const postReunion = async (req, res) => {
  const { nombre, fecha_inicio, fecha_fin } = req.body;
  const date_create = getCurrentDateTime(); // Asegúrate de que esta función devuelva la fecha y hora actual en el formato adecuado

  try {
    const resultado = await pool.query(
      'INSERT INTO reuniones (nombre, fecha_inicio, fecha_fin) VALUES (?, ?, ?)',
      [nombre, fecha_inicio, fecha_fin]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Reunión creada exitosamente' });
    } else {
      res.json({ resultado: 'Reunión no creada' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al crear reunión' });
  }
};

export const putReunion = async (req, res) => {
  const { nombre, fecha_inicio, fecha_fin, reunion_id } = req.body;

  try {
    const resultado = await pool.query(
      `UPDATE reuniones SET 
      nombre = ?, 
      fecha_inicio = ?, 
      fecha_fin = ?
      WHERE reunion_id = ?`,
      [nombre, fecha_inicio, fecha_fin, reunion_id]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Reunión actualizada exitosamente' });
    } else {
      res.json({ resultado: 'Reunión no actualizada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al actualizar reunión' });
  }
};

export const delReunion = async (req, res) => {
  const { reunion_id } = req.params;

  try {
    const resultado = await pool.query('DELETE FROM reuniones WHERE reunion_id = ?', [reunion_id]);

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Reunión eliminada exitosamente' });
    } else {
      res.json({ resultado: 'Reunión no eliminada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al eliminar reunión' });
  }
};
