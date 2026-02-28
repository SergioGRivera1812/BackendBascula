import { db } from "../config/db.js";


export const Usuario = {
    async crear(nombre, usuario, password, rol) {
        return db.query(
            "INSERT INTO usuarios (nombre, usuario, password, rol) VALUES (?, ?, ?, ?)",
            [nombre, usuario, password, rol]
        );
    },

    async obtenerTodos() {
        const [rows] = await db.query("SELECT id, nombre, usuario, rol, creado_en FROM usuarios");
        return rows;
    },

    async obtenerUno(id) {
        const [rows] = await db.query("SELECT id, nombre, usuario, rol, creado_en FROM usuarios WHERE id = ?", [id]);
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
        return db.query(`UPDATE usuarios SET ${fields.join(", ")} WHERE id = ?`, values);
    },

    async eliminar(id) {
        return db.query("DELETE FROM usuarios WHERE id = ?", [id]);
    }
};
