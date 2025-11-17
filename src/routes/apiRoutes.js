// api-bascula/src/routes/apiRoutes.js

const express = require('express');
const router = express.Router();

// Importar todos los controladores
const usuarioController = require('../controllers/usuarioController');
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const transaccionController = require('../controllers/transaccionController');

// --- 👥 RUTAS DE USUARIOS ---
router.post('/usuarios', usuarioController.crearUsuario); // Alta
router.get('/getusuarios', usuarioController.obtenerUsuarios); // Obtener todos
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId); // Búsqueda por ID
router.put('/usuarios/:id', usuarioController.actualizarUsuario); // Modificación
router.delete('/usuarios/:id', usuarioController.eliminarUsuario); // Eliminación (Baja)

// --- 🧑‍💼 RUTAS DE CLIENTES ---
router.post('/clientes', clienteController.crearCliente); // Alta
router.get('/clientes', clienteController.obtenerClientes); // Obtener todos
router.get('/clientes/:id', clienteController.obtenerClientePorId); // Búsqueda por ID
router.put('/clientes/:id', clienteController.actualizarCliente); // Modificación
router.delete('/clientes/:id', clienteController.eliminarCliente); // Eliminación (Baja)

// --- 📦 RUTAS DE PRODUCTOS ---
router.post('/productos', productoController.crearProducto); // Alta
router.get('/productos', productoController.obtenerProductos); // Obtener todos
router.get('/productos/:id', productoController.obtenerProductoPorId); // Búsqueda por ID
router.put('/productos/:id', productoController.actualizarProducto); // Modificación
router.delete('/productos/:id', productoController.eliminarProducto); // Eliminación (Baja)

// --- ⚖️ RUTAS DE BÁSCULA (TRANSACCIONES) ---
router.post('/transacciones/entrada', transaccionController.registrarEntrada);
router.post('/transacciones/salida', transaccionController.registrarSalida);
router.get('/transacciones', transaccionController.obtenerTransacciones);
router.get('/transacciones/pendientes', transaccionController.obtenerPendientes);

module.exports = router;