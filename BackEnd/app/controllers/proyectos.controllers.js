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
  const { nombre, descripcion, estado, prioridad, manager_id } = req.body;
  const fecha_creacion = getCurrentDateTime();
  const fecha_actualizacion = getCurrentDateTime();

  try {
    const resultado = await pool.query(
      "INSERT INTO Proyectos (nombre, descripcion, estado, prioridad, fecha_creacion, fecha_actualizacion, manager_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, descripcion, estado, prioridad, fecha_creacion, fecha_actualizacion, manager_id]
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
  const { nombreAnterior, nombre, descripcion, estado, prioridad, manager_id } = req.body;

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
      manager_id = ?,
      fecha_actualizacion = ?
      WHERE nombre = ?`,
      [nombre, descripcion, estado, prioridad, manager_id, getCurrentDateTime(), nombreAnterior]
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

export const putManager = async (req, res) => {
  const { usuario_id } = req.params;
  const newManager_id = null;

  try {
    // Buscar el id_manager asociado al usuario_id
    const [managerData] = await pool.query('SELECT id_manager FROM Proyectos WHERE usuario_id = ?', [usuario_id]);
    const id_manager = managerData[0]?.id_manager;

    if (!id_manager) {
      return res.status(404).json({ resultado: "Manager no encontrado" });
    }

    // Actualizar el id_manager a null
    const [resultado] = await pool.query('UPDATE Proyectos SET manager_id = ? WHERE manager_id = ?', [newManager_id, id_manager]);

    if (resultado.affectedRows > 0) {
      res.json({ resultado: "Manager borrado exitosamente" });
    } else {
      res.json({ resultado: "Manager no borrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: "Error al borrar el manager" });
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
