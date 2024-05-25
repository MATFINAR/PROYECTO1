import { pool } from "../config/bd-mysql.js";
import { getCurrentDateTime } from '../util/dateHelper.js';

export const showProject = async (req, res) => {
  
  try {
    
    const resultado = await pool.query("SELECT * FROM proyectos");
    res.json( resultado[0] );

  } catch (error) {
    res.status(500).json({ "error": error, resultado: "Error en la consulta Get de proyectos" });
  }
};

export const getProject = async (req, res) => {
  const { Nombre } = req.params;

  try {
    const resultado = await pool.query('SELECT * FROM proyectos WHERE Nombre = ?', [Nombre]);
    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.resultado, resultado: 'Error en la consulta Get de proyecto' });
  }
};

export const postProject = async (req, res) => {
  const { Nombre, Descripcion, FechaInicio, FechaFin } = req.body;
  const date_create = getCurrentDateTime();

  try {
    const resultado = await pool.query(
      "INSERT INTO proyectos (Nombre, Descripcion, FechaInicio, FechaFin, date_create) VALUES (?, ?, ?, ?, ?)",
      [Nombre, Descripcion, FechaInicio, FechaFin, date_create]
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
  const { NombreAnterior, Nombre, Descripcion, FechaInicio, FechaFin } = req.body;

  try {
    // Verificar si el nuevo nombre del proyecto ya existe (excepto el proyecto actual)
    const existingProject = await pool.query(
      `SELECT ID FROM proyectos WHERE Nombre = ? AND Nombre != ?`,
      [Nombre, NombreAnterior]
    );

    if (existingProject[0].length > 0) {
      return res.status(400).json({ resultado: "El nombre del proyecto ya existe" });
    }

    // Actualizar el proyecto usando el nombre antiguo
    const resultado = await pool.query(
      `UPDATE proyectos SET 
      Nombre = ?, 
      Descripcion = ?, 
      FechaInicio = ?, 
      FechaFin = ? 
      WHERE Nombre = ?`,
      [Nombre, Descripcion, FechaInicio, FechaFin, NombreAnterior]
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
  const Nombre = req.params.Nombre;

  try {
    
    const resultado=await pool.query("DELETE FROM proyectos WHERE Nombre = ?", [Nombre]);
    
    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: "Proyecto eliminado exitosamente" });
    } else {
      res.json({ resultado: "Proyecto no eliminado" });
    
    }  } catch (error) {
    res.status(500).json({ "error": error , resultado: "Error al eliminar proyecto" });
  }
};