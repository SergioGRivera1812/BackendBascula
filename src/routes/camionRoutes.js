import express from "express";
import { camionController } from "../controllers/camionController.js";

const router = express.Router();

router.post("/", camionController.crear);
router.get("/", camionController.obtenerTodos);
router.get("/:id", camionController.obtenerUno);
router.put("/:id", camionController.actualizar);
router.delete("/:id", camionController.eliminar);

export default router;
