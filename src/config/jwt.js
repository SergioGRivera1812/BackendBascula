import "./env.js";
import jwt from "jsonwebtoken";

// Secreto para firmar los tokens. En producción DEBE definirse en .env (JWT_SECRET).
// El valor por defecto es solo para desarrollo local.
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_inseguro_cambiar_en_produccion";

// Tiempo de expiración del token (ej. "8h", "1d", "30m").
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h";

// Genera un token firmado con los datos del usuario.
export function generarToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verifica un token; lanza una excepción si es inválido o expiró.
export function verificarTokenJWT(token) {
    return jwt.verify(token, JWT_SECRET);
}
