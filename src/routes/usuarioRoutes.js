import express from "express";
import { usuarioController } from "../controllers/usuarioController.js";

const router = express.Router();

// Crear usuario
router.post("/", usuarioController.crear);

// Login
router.post("/login", usuarioController.login);

// Obtener todos
router.get("/", usuarioController.obtenerTodos);

// Obtener por id
router.get("/:id", usuarioController.obtenerUno);

// Actualizar
router.put("/:id", usuarioController.actualizar);

// Eliminar
router.delete("/:id", usuarioController.eliminar);

export default router;
