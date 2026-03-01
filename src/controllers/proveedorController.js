import { Proveedor } from "../models/Proveedor.js";

export const proveedorController = {
    // Crear
    async crear(req, res) {
        try {
            const { nombre, contacto, telefono } = req.body;
            await Proveedor.crear(nombre, contacto, telefono);
            res.json({ message: "Proveedor creado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Leer todos
    async obtenerTodos(req, res) {
        try {
            const datos = await Proveedor.obtenerTodos();
            res.json(datos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Leer uno
    async obtenerUno(req, res) {
        try {
            const id = req.params.id;
            const dato = await Proveedor.obtenerUno(id);
            if (!dato) return res.status(404).json({ message: "Proveedor no encontrado" });
            res.json(dato);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar
    async actualizar(req, res) {
        try {
            const id = req.params.id;
            const { nombre, contacto, telefono } = req.body;
            await Proveedor.actualizar(id, { nombre, contacto, telefono });
            res.json({ message: "Proveedor actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar
    async eliminar(req, res) {
        try {
            const id = req.params.id;
            await Proveedor.eliminar(id);
            res.json({ message: "Proveedor eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
