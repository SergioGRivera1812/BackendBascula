import { db } from "../config/db.js";


export const EntradaBascula = {
    // Crear nueva entrada
    async crear({ codigoEntrada, nombre_chofer, id_material, cliente, tara }) {
        return db.query(
            `INSERT INTO entrada_bascula 
            (codigoEntrada, nombre_chofer, id_material, cliente, tara, activo)
            VALUES (?, ?, ?, ?, ?, 1)`,
            [codigoEntrada, nombre_chofer, id_material, cliente, tara]
        );
    },

    // Obtener todas las entradas
    async obtenerTodos() {
        const [rows] = await db.query("SELECT * FROM entrada_bascula");
        return rows;
    },

    // Obtener una entrada por ID
    async obtenerUno(id) {
        const [rows] = await db.query("SELECT * FROM entrada_bascula WHERE id = ?", [id]);
        return rows[0];
    },

    // Obtener entradas activas
    async obtenerActivos() {
        const [rows] = await db.query("SELECT * FROM entrada_bascula WHERE activo = 1");
        return rows;
    },

    // Actualizar entrada
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
        return db.query(`UPDATE entrada_bascula SET ${fields.join(", ")} WHERE id = ?`, values);
    },

    // Eliminar entrada
    async eliminar(id) {
        return db.query("DELETE FROM entrada_bascula WHERE id = ?", [id]);
    },

    // Marcar salida de una entrada (activo = 0)
    async marcarSalida(codigoEntrada) {
        return db.query("UPDATE entrada_bascula SET activo = 0 WHERE codigoEntrada = ?", [codigoEntrada]);
    }
};
