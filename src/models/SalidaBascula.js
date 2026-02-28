import { db } from "../config/db.js";


export const SalidaBascula = {
    // Crear salida
    async crear({ codigoEntrada, bruto, neto }) {
        return db.query(
            `INSERT INTO salida_bascula 
            (codigoEntrada, bruto, neto, activo)
            VALUES (?, ?, ?, 0)`,
            [codigoEntrada, bruto, neto]
        );
    },

    // Obtener todas las salidas
    async obtenerTodos() {
        const [rows] = await db.query("SELECT * FROM salida_bascula");
        return rows;
    },

    // Obtener salida por ID
    async obtenerUno(id) {
        const [rows] = await db.query("SELECT * FROM salida_bascula WHERE id = ?", [id]);
        return rows[0];
    },

    // Actualizar salida
    async actualizar(id, datos) {
        const fields = [];
        const values = [];
        for (let key in datos) {
            if (datos[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(datos[key]);
            }
        }
        values.push(id);
        return db.query(`UPDATE salida_bascula SET ${fields.join(", ")} WHERE id = ?`, values);
    },

    // Eliminar salida
    async eliminar(id) {
        return db.query("DELETE FROM salida_bascula WHERE id = ?", [id]);
    }
};
