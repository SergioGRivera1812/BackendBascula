import { db } from "../config/db.js";

export const Camion = {
    async crear(placas, chofer) { return db.query("INSERT INTO camiones (placas, chofer) VALUES (?,?)", [placas, chofer]); },
    async obtenerTodos() { const [rows] = await db.query("SELECT * FROM camiones"); return rows; },
    async obtenerUno(id) { const [rows] = await db.query("SELECT * FROM camiones WHERE id=?", [id]); return rows[0]; },
    async actualizar(id, datos) {
        const fields = [], values = [];
        for (let key in datos) { if (datos[key] !== undefined) { fields.push(`${key}=?`); values.push(datos[key]); } }
        values.push(id);
        return db.query(`UPDATE camiones SET ${fields.join(", ")} WHERE id=?`, values);
    },
    async eliminar(id) { return db.query("DELETE FROM camiones WHERE id=?", [id]); }
};
