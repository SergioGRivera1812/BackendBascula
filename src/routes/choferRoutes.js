import express from "express";
import { choferController } from "../controllers/choferController.js";

const router = express.Router();

router.post("/", choferController.crear);
router.get("/", choferController.obtenerTodos);
router.get("/:id", choferController.obtenerUno);
router.put("/:id", choferController.actualizar);
router.delete("/:id", choferController.eliminar);

export default router;
