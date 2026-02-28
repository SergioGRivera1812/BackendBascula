import express from "express";
import { proveedorController } from "../controllers/proveedorController.js";

const router = express.Router();

router.post("/", proveedorController.crear);
router.get("/", proveedorController.obtenerTodos);
router.get("/:id", proveedorController.obtenerUno);
router.put("/:id", proveedorController.actualizar);
router.delete("/:id", proveedorController.eliminar);

export default router;
