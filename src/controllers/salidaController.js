import { SalidaBascula } from "../models/SalidaBascula.js";
import { EntradaBascula } from "../models/EntradaBascula.js";

export const salidaController = {
    // Crear salida
    async crear(req, res) {
        try {
            const { codigoEntrada, bruto, tara } = req.body;
            const neto = bruto - tara;

            await SalidaBascula.crear({ codigoEntrada, bruto, neto });

            // Marcar la entrada como salida (activo = 0)
            await EntradaBascula.marcarSalida(codigoEntrada);

            res.json({ message: "Salida registrada correctamente", neto });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener todas las salidas
    async obtenerTodos(req, res) {
        try {
            const datos = await SalidaBascula.obtenerTodos();
            res.json(datos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener salida por ID
    async obtenerUno(req, res) {
        try {
            const id = req.params.id;
            const dato = await SalidaBascula.obtenerUno(id);
            if (!dato) return res.status(404).json({ message: "Salida no encontrada" });
            res.json(dato);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar salida
    async actualizar(req, res) {
        try {
            await SalidaBascula.actualizar(req.params.id, req.body);
            res.json({ message: "Salida actualizada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar salida
    async eliminar(req, res) {
        try {
            await SalidaBascula.eliminar(req.params.id);
            res.json({ message: "Salida eliminada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
