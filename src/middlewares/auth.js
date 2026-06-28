import { verificarTokenJWT } from "../config/jwt.js";

// Middleware que protege rutas exigiendo un token JWT válido.
// Espera el header: Authorization: Bearer <token>
// Si el token es válido, adjunta los datos del usuario en req.usuario y continúa.
export function verificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verificarTokenJWT(token);
        req.usuario = decoded; // { id, usuario, rol, iat, exp }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}
