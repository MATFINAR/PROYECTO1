import { pool } from "../config/bd-mysql.js"

export const putToken = async(req, res) => {
  const { usuario_id } = req.body;
  
  try {
    const resultado = await pool.query(`INSERT token (usuario_id) VALUES (${usuario_id})`)

    if (resultado[0].affectedRows > 0) {
      res.json('Token agregado');
    } else {
      res.json('Token no agregado');
    }
  } catch (error) {
    res.json({
      'error':error,
      "method":"Post"
    })
  }
}