// api-bascula/src/controllers/clienteController.js

// ⚠️ SIMULACIÓN DE DATOS (En memoria) ⚠️
let clientes = [];
let proximoIdCliente = 1;

// POST: Crear nuevo cliente (Alta)
exports.crearCliente = (req, res) => {
    const { nombreCliente, codigoCliente } = req.body;
    
    if (!nombreCliente || !codigoCliente) {
        return res.status(400).json({ error: 'Faltan campos: nombreCliente y codigoCliente son requeridos.' });
    }
    
    const nuevoCliente = { 
        id: proximoIdCliente++, 
        nombreCliente, 
        codigoCliente 
    };
    
    clientes.push(nuevoCliente);
    res.status(201).json({ mensaje: 'Cliente registrado con éxito', cliente: nuevoCliente });
};

// GET: Obtener todos los clientes (Lectura)
exports.obtenerClientes = (req, res) => {
    res.status(200).json(clientes);
};

// GET: Buscar cliente por ID (Lectura por ID)
exports.obtenerClientePorId = (req, res) => {
    const id = parseInt(req.params.id); 
    const clienteEncontrado = clientes.find(c => c.id === id);

    if (!clienteEncontrado) {
        return res.status(404).json({ error: `Cliente con ID ${id} no encontrado.` });
    }
    
    res.status(200).json(clienteEncontrado);
};

// PUT: Actualizar cliente (Modificación)
exports.actualizarCliente = (req, res) => {
    const id = parseInt(req.params.id); 
    const { nombreCliente, codigoCliente } = req.body; 
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `Cliente con ID ${id} no encontrado.` });
    }
    
    // Actualizamos
    if (nombreCliente) clientes[index].nombreCliente = nombreCliente;
    if (codigoCliente) clientes[index].codigoCliente = codigoCliente;

    res.status(200).json({ 
        mensaje: `Cliente con ID ${id} actualizado con éxito.`, 
        cliente: clientes[index] 
    });
};

// DELETE: Eliminar cliente (Baja / Eliminación)
exports.eliminarCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `Cliente con ID ${id} no encontrado.` });
    }

    clientes.splice(index, 1);

    res.status(200).json({ mensaje: `Cliente con ID ${id} eliminado con éxito.` });
};