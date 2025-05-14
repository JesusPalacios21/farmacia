import { Router } from "express";
import {
  getMedicamentos,
  getMedicamentoByid,
  getMedicamentosByReceta,
  getMedicamentosByTipo,
  createMedicamentos,
  updateMedicamentos,
  deleteMedicamentos
} from "../controllers/farmacia.controller.js";

const router = Router()

// GET
router.get('/medicamentos', getMedicamentos)
router.get('/medicamentos/:id', getMedicamentoByid)
router.get('/medicamentos/receta/:receta', getMedicamentosByReceta)
router.get('/medicamentos/tipo/:tipo', getMedicamentosByTipo)

// POST
router.post('/medicamentos', createMedicamentos)

// PUT
router.put('/medicamentos/:id', updateMedicamentos)

// DELETE
router.delete('/medicamentos/:id', deleteMedicamentos)

export default router
