import { pool } from "../config/bd-mysql.js";
import { getCurrentDateTime } from '../util/dateHelper.js';

export const showProject = async (req, res) => {
  
  try {
    
    const resultado = await pool.query("SELECT * FROM Proyectos");
    res.json(resultado[0]);

  } catch (error) {
    res.status(500).json({ "error": error, resultado: "Error en la consulta Get de proyectos" });
  }
};

export const getProject = async (req, res) => {
  const { nombre } = req.params;

  try {
    const resultado = await pool.query('SELECT * FROM Proyectos WHERE nombre = ?', [nombre]);
    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ "error": error.resultado, resultado: 'Error en la consulta Get de proyecto' });
  }
};

export const postProject = async (req, res) => {
  const { nombre, descripcion, estado, prioridad, manager_email } = req.body;
  const fecha_creacion = getCurrentDateTime();
  const fecha_actualizacion = getCurrentDateTime();

  try {
    const resultado = await pool.query(
      "INSERT INTO Proyectos (nombre, descripcion, estado, prioridad, fecha_creacion, fecha_actualizacion, manager_email ) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, descripcion, estado, prioridad, fecha_creacion, fecha_actualizacion, manager_email]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: "Proyecto creado exitosamente" });
    } else {
      res.json({ resultado: "Proyecto no creado" });
    }

  } catch (error) {
    res.status(500).json({ "error": error, resultado: "Error al crear proyecto" });
  }
};

export const putProject = async (req, res) => {
  const { nombreAnterior, nombre, descripcion, estado, prioridad, manager_email } = req.body;

  try {
    // Verificar si el nuevo nombre del proyecto ya existe (excepto el proyecto actual)
    const existingProject = await pool.query(
      `SELECT proyecto_id FROM Proyectos WHERE nombre = ? AND nombre != ?`,
      [nombre, nombreAnterior]
    );

    if (existingProject[0].length > 0) {
      return res.status(400).json({ resultado: "El nombre del proyecto ya existe" });
    }

    // Actualizar el proyecto usando el nombre antiguo
    const resultado = await pool.query(
      `UPDATE Proyectos SET 
      nombre = ?, 
      descripcion = ?, 
      estado = ?, 
      prioridad = ?, 
      manager_email = ?,
      fecha_actualizacion = ?
      WHERE nombre = ?`,
      [nombre, descripcion, estado, prioridad, manager_email , getCurrentDateTime(), nombreAnterior]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: "Proyecto actualizado exitosamente" });
    } else {
      res.json({ resultado: "Proyecto no actualizado exitosamente" });
    }
  } catch (error) {
    res.status(500).json({ error: error.resultado, resultado: "Error al actualizar proyecto" });
  }
};

export const delProject = async (req, res) => {
  const nombre = req.params.nombre;

  try {
    
    const resultado=await pool.query("DELETE FROM Proyectos WHERE nombre = ?", [nombre]);
    
    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: "Proyecto eliminado exitosamente" });
    } else {
      res.json({ resultado: "Proyecto no eliminado" });
    
    }  } catch (error) {
    res.status(500).json({ "error": error , resultado: "Error al eliminar proyecto" });
  }
};
