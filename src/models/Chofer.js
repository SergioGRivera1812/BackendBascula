// models/Chofer.js
import { db } from "../config/db.js";

export const Chofer = {
    async crear(nombre, telefono){ return db.query("INSERT INTO choferes (nombre, telefono) VALUES (?,?)",[nombre,telefono]); },
    async obtenerTodos(){ const [rows]= await db.query("SELECT * FROM choferes"); return rows; },
    async obtenerUno(id){ const [rows]= await db.query("SELECT * FROM choferes WHERE id=?",[id]); return rows[0]; },
    async actualizar(id, datos){ const fields=[], values=[]; for(let k in datos){ if(datos[k]!==undefined){ fields.push(`${k}=?`); values.push(datos[k]); } } values.push(id); return db.query(`UPDATE choferes SET ${fields.join(", ")} WHERE id=?`, values); },
    async eliminar(id){ return db.query("DELETE FROM choferes WHERE id=?",[id]); }
};
