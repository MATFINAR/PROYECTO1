import { pool } from "../config/bd-mysql.js";
import { getCurrentDateTime } from '../util/dateHelper.js';

export const showTasks = async (req, res) => {
  
  try {
    
    const resultado = await pool.query("SELECT * FROM tareas");
    res.json( resultado[0] );

  } catch (error) {
    res.status(500).json({ "error": error, resultado: "Error en la consulta Get de tareas" });
  }
};

export const getTask = async (req, res) => {
  const { Nombre } = req.params;

  try {
    const resultado = await pool.query('SELECT * FROM tareas WHERE Nombre = ?', [Nombre]);
    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error en la consulta Get de tarea' });
  }
};

export const postTask = async (req, res) => {
  const { ID_Proyecto, Nombre, Descripcion, FechaInicio, FechaFin, Estado } = req.body;
  const date_create = getCurrentDateTime();

  try {
    const resultado = await pool.query(
      "INSERT INTO tareas (ID_Proyecto, Nombre, Descripcion, FechaInicio, FechaFin, Estado, date_create) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [ID_Proyecto, Nombre, Descripcion, FechaInicio, FechaFin, Estado, date_create]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ message: "Tarea creado exitosamente" });
    } else {
      res.json({ message: "Tarea no creado" });
    }

  } catch (error) {
    res.status(500).json({ "error": error, resultado: "Error al crear tarea" });
  }
};

export const putTask = async (req, res) => {
  const info = req.body;

  try {

    const existingProject = await pool.query(
      `SELECT ID FROM tareas WHERE Nombre = ? AND ID != ?`,
      [info.Nombre, info.ID]
    );

    if (existingProject[0].length > 0) {
      return res.status(400).json({ resultado: "El nombre del proyecto ya existe" });
    }

    const resultado = await pool.query(
      `UPDATE tareas SET 
      ID_Proyecto = ?,
      Nombre = ?, 
      Descripcion = ?, 
      FechaInicio = ?, 
      FechaFin = ?,
      Estado = ?
      WHERE ID = ?`,
      [info.ID_Proyecto, info.Nombre, info.Descripcion, info.FechaInicio, info.FechaFin, info.Estado, info.ID]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: "Tarea actualizado exitosamente" });
    } else {
      res.json({ resultado: "Tarea no actualizado exitosamente" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: "Error al actualizar tarea" });
  }
};

export const delTask = async (req, res) => {
  const Nombre = req.params.Nombre;

  try {
    
    const resultado=await pool.query("DELETE FROM tareas WHERE Nombre = ?", [Nombre]);
    
    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: "Tarea eliminado exitosamente" });
    } else {
      res.json({ resultado: "Tarea no eliminado" });
    
    }  } catch (error) {
    res.status(500).json({ "error": error , resultado: "Error al eliminar tarea" });
  }
};
