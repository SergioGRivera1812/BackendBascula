import { db } from "../config/db.js";

export const Proveedor = {
    async crear(nombre, contacto, telefono) {
        return db.query(
            "INSERT INTO proveedores (nombre, contacto, telefono) VALUES (?, ?, ?)",
            [nombre, contacto, telefono]
        );
    },

    async obtenerTodos() {
        const [rows] = await db.query("SELECT * FROM proveedores");
        return rows;
    },

    async obtenerUno(id) {
        const [rows] = await db.query("SELECT * FROM proveedores WHERE id = ?", [id]);
        return rows[0];
    },

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
        return db.query(`UPDATE proveedores SET ${fields.join(", ")} WHERE id = ?`, values);
    },

    async eliminar(id) {
        return db.query("DELETE FROM proveedores WHERE id = ?", [id]);
    }
};
