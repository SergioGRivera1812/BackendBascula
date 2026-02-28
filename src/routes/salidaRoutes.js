import express from "express";
import { salidaController } from "../controllers/salidaController.js";

const router = express.Router();

router.post("/", salidaController.crear);
router.get("/", salidaController.obtenerTodos);
router.get("/:id", salidaController.obtenerUno);
router.put("/:id", salidaController.actualizar);
router.delete("/:id", salidaController.eliminar);

export default router;
