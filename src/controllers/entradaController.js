import { EntradaBascula } from "../models/EntradaBascula.js";

export const entradaController = {
    // Crear nueva entrada
    async crear(req, res) {
        try {
            await EntradaBascula.crear(req.body);
            res.json({ message: "Entrada registrada correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener todas las entradas
    async obtenerTodos(req, res) {
        try {
            const datos = await EntradaBascula.obtenerTodos();
            res.json(datos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener entrada por ID
    async obtenerUno(req, res) {
        try {
            const id = req.params.id;
            const dato = await EntradaBascula.obtenerUno(id);
            if (!dato) return res.status(404).json({ message: "Entrada no encontrada" });
            res.json(dato);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener entradas activas
    async obtenerActivos(req, res) {
        try {
            const datos = await EntradaBascula.obtenerActivos();
            res.json(datos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar entrada
    async actualizar(req, res) {
        try {
            await EntradaBascula.actualizar(req.params.id, req.body);
            res.json({ message: "Entrada actualizada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar entrada
    async eliminar(req, res) {
        try {
            await EntradaBascula.eliminar(req.params.id);
            res.json({ message: "Entrada eliminada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
