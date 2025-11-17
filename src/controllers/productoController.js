// api-bascula/src/controllers/productoController.js

// ⚠️ SIMULACIÓN DE DATOS (En memoria) ⚠️
let productos = [];
let proximoIdProducto = 1;

// POST: Crear nuevo producto (Alta)
exports.crearProducto = (req, res) => {
    const { nombreProducto, codigoProducto } = req.body;

    if (!nombreProducto || !codigoProducto) {
        return res.status(400).json({ error: 'Faltan campos: nombreProducto y codigoProducto son requeridos.' });
    }
    
    const nuevoProducto = { 
        id: proximoIdProducto++, 
        nombreProducto, 
        codigoProducto 
    };
    
    productos.push(nuevoProducto);
    res.status(201).json({ mensaje: 'Producto registrado con éxito', producto: nuevoProducto });
};

// GET: Obtener todos los productos (Lectura)
exports.obtenerProductos = (req, res) => {
    res.status(200).json(productos);
};

// GET: Buscar producto por ID (Lectura por ID)
exports.obtenerProductoPorId = (req, res) => {
    const id = parseInt(req.params.id); 
    const productoEncontrado = productos.find(p => p.id === id);

    if (!productoEncontrado) {
        return res.status(404).json({ error: `Producto con ID ${id} no encontrado.` });
    }
    
    res.status(200).json(productoEncontrado);
};

// PUT: Actualizar producto (Modificación)
exports.actualizarProducto = (req, res) => {
    const id = parseInt(req.params.id); 
    const { nombreProducto, codigoProducto } = req.body; 
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `Producto con ID ${id} no encontrado.` });
    }
    
    // Actualizamos
    if (nombreProducto) productos[index].nombreProducto = nombreProducto;
    if (codigoProducto) productos[index].codigoProducto = codigoProducto;

    res.status(200).json({ 
        mensaje: `Producto con ID ${id} actualizado con éxito.`, 
        producto: productos[index] 
    });
};

// DELETE: Eliminar producto (Baja / Eliminación)
exports.eliminarProducto = (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `Producto con ID ${id} no encontrado.` });
    }

    productos.splice(index, 1);

    res.status(200).json({ mensaje: `Producto con ID ${id} eliminado con éxito.` });
};