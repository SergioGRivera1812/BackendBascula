import { Transaccion } from "../models/Transaccion.js";

export const transaccionController = {
    async obtenerTodas(req, res) {
        try {
            const datos = await Transaccion.obtenerTodas();
            res.json(datos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
