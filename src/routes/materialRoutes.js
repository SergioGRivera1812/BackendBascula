import express from "express";
import { materialController } from "../controllers/materialController.js";

const router = express.Router();

router.post("/", materialController.crear);
router.get("/", materialController.obtenerTodos);
router.get("/:id", materialController.obtenerUno);
router.put("/:id", materialController.actualizar);
router.delete("/:id", materialController.eliminar);

export default router;
