import bcrypt from "bcrypt";
import { Usuario } from "../models/Usuario.js";

export const usuarioController = {
    // Crear
    async crear(req, res) {
        try {
            const { nombre, usuario, password, rol } = req.body;
            const passwordHash = await bcrypt.hash(password, 10);
            await Usuario.crear(nombre, usuario, passwordHash, rol);
            res.json({ message: "Usuario creado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Leer todos
    async obtenerTodos(req, res) {
        try {
            const datos = await Usuario.obtenerTodos();
            res.json(datos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Leer uno
    async obtenerUno(req, res) {
        try {
            const id = req.params.id;
            const dato = await Usuario.obtenerUno(id);
            if (!dato) return res.status(404).json({ message: "Usuario no encontrado" });
            res.json(dato);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar
    async actualizar(req, res) {
        try {
            const id = req.params.id;
            const { nombre, usuario, password, rol } = req.body;
            const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
            await Usuario.actualizar(id, { nombre, usuario, password: passwordHash, rol });
            res.json({ message: "Usuario actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar
    async eliminar(req, res) {
        try {
            const id = req.params.id;
            await Usuario.eliminar(id);
            res.json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // LOGIN
    async login(req, res) {
        try {
            const { usuario, password } = req.body;
            const user = await Usuario.obtenerPorUsuario(usuario);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const esValido = await bcrypt.compare(password, user.password);
            if (!esValido) {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            // Opcional: podrías generar un token JWT aquí si quieres
            res.json({ message: "Login exitoso", usuario: { id: user.id, nombre: user.nombre, rol: user.rol } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
