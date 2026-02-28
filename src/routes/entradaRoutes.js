import express from "express";
import { entradaController } from "../controllers/entradaController.js";

const router = express.Router();

router.post("/", entradaController.crear);
router.get("/", entradaController.obtenerTodos);
router.get("/:id", entradaController.obtenerUno);
router.get("/activos/lista", entradaController.obtenerActivos);
router.put("/:id", entradaController.actualizar);
router.delete("/:id", entradaController.eliminar);

export default router;
