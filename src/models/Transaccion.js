import { db } from "../config/db.js";

export const Transaccion = {
    // Obtener todas las transacciones de la vista
    async obtenerTodas() {
        const [rows] = await db.query("SELECT * FROM vista_transacciones ORDER BY fecha DESC");
        return rows;
    }
};
