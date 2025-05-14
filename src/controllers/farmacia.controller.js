import { pool } from "../db.js";

//ESTO ES PARA EL METODO GET

// Obtener todos los medicamentos
export const getMedicamentos = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM medicamentos")
  res.json(rows)
}

// Obtener medicamento por ID
export const getMedicamentoByid = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM medicamentos WHERE id = ?", [req.params.id])
  if (rows.length <= 0) {
    return res.status(404).json({
      message: 'No existe medicamento con este ID'
    })
  }
  res.json(rows[0])
}

// Obtener medicamentos por receta (S o N)
export const getMedicamentosByReceta = async (req, res) => {
  const { receta } = req.params
  const [rows] = await pool.query("SELECT * FROM medicamentos WHERE receta = ?", [receta])
  res.json(rows)
}

// Obtener medicamentos por tipo (ej: ANALGESICO)
export const getMedicamentosByTipo = async (req, res) => {
  const { tipo } = req.params
  const [rows] = await pool.query("SELECT * FROM medicamentos WHERE tipo = ?", [tipo])
  res.json(rows)
}

//AQUI TERMINA TODO EL METODO GET


//AQUI EMPIEZA EL METODO CREATE CON SUS VALIDACIONES

export const createMedicamentos = async (req, res) => {
  try {
    const { tipo, nombre, nomcomercial, presentacion, receta, precio } = req.body

    // 🔒 Validación de precio
    if (!precio || precio <= 0) {
      return res.status(400).json({
        error: 'El precio debe ser mayor a 0'
      })
    }

    const [result] = await pool.query(
      "INSERT INTO medicamentos (tipo, nombre, nomcomercial, presentacion, receta, precio) VALUES (?, ?, ?, ?, ?, ?)",
      [tipo, nombre, nomcomercial || null, presentacion, receta, precio]
    )

    res.json({
      id: result.insertId,
      tipo,
      nombre,
      nomcomercial: nomcomercial || null,
      presentacion,
      receta,
      precio
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al crear medicamento' })
  }
}
//AQUI TERMINA EL METODO CREATE

//AQUI EMPIEZA EL METODO UPDATE CON SI VALIDACION

export const updateMedicamentos = async (req, res) => {
  const id = req.params.id
  const { tipo, nombre, nomcomercial, presentacion, receta, precio } = req.body

  // Validación de precio
  if (precio <= 0) {
    return res.status(400).json({
      error: 'El precio debe ser mayor a 0'
    })
  }

  const querySQL = `
    UPDATE medicamentos SET
      tipo = ?,
      nombre = ?,
      nomcomercial = ?,
      presentacion = ?,
      receta = ?,
      precio = ?
    WHERE id = ?
  `
  
  const [result] = await pool.query(querySQL, [tipo, nombre, nomcomercial, presentacion, receta, precio, id])

  if (result.affectedRows == 0) {
    return res.status(404).json({
      message: 'El ID no existe'
    })
  }

  res.json({ message: 'Actualización correcta' })
}
//AQUI TERMINA EL METODO UPDATE

//AQUI EMPIEZA EL METODO DELETE CON SU VALIDACION

export const deleteMedicamentos = async (req, res) => {
  const id = req.params.id;

  // Primero, obtenemos el medicamento para verificar si tiene receta 'S'
  const [medicamento] = await pool.query("SELECT receta FROM medicamentos WHERE id = ?", [id]);

  if (medicamento.length === 0) {
    return res.status(404).json({
      message: 'No existe registro con este ID'
    });
  }

  // Validación de receta
  if (medicamento[0].receta === 'S') {
    return res.status(400).json({
      error: 'No se puede eliminar las recetas con función ("S")'
    });
  }

  // Si pasa la validación, procedemos con la eliminación
  const [result] = await pool.query("DELETE FROM medicamentos WHERE id = ?", [id]);

  if (result.affectedRows <= 0) {
    return res.status(404).json({
      message: 'No existe registro con este ID'
    });
  }

  res.status(200).json({
    message: 'Medicamento eliminado correctamente'
  });
}

//AQUI TERMINA EL METODO DELETE