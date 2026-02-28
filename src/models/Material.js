// models/Material.js
import { db } from "../config/db.js";

export const Material = {
    async crear(nombre, descripcion){ return db.query("INSERT INTO materiales (nombre, descripcion) VALUES (?,?)",[nombre,descripcion]); },
    async obtenerTodos(){ const [rows]= await db.query("SELECT * FROM materiales"); return rows; },
    async obtenerUno(id){ const [rows]= await db.query("SELECT * FROM materiales WHERE id=?",[id]); return rows[0]; },
    async actualizar(id, datos){ const fields=[], values=[]; for(let k in datos){ if(datos[k]!==undefined){ fields.push(`${k}=?`); values.push(datos[k]); } } values.push(id); return db.query(`UPDATE materiales SET ${fields.join(", ")} WHERE id=?`, values); },
    async eliminar(id){ return db.query("DELETE FROM materiales WHERE id=?",[id]); }
};
