import express from "express";
import { usuarioController } from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/auth.js";

const router = express.Router();

// --- Ruta pública ---
// Login (no requiere token: es la puerta de entrada para obtenerlo)
router.post("/login", usuarioController.login);

// --- A partir de aquí, TODAS las rutas requieren token válido ---
router.use(verificarToken);

// Crear usuario
router.post("/", usuarioController.crear);

// Obtener todos
router.get("/", usuarioController.obtenerTodos);

// Obtener por id
router.get("/:id", usuarioController.obtenerUno);

// Actualizar
router.put("/:id", usuarioController.actualizar);

// Eliminar
router.delete("/:id", usuarioController.eliminar);

export default router;
