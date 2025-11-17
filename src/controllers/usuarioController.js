// api-bascula/src/controllers/usuarioController.js

// ⚠️ SIMULACIÓN DE DATOS (En memoria) ⚠️
let usuarios = [];
let proximoIdUsuario = 1;

// POST: Crear nuevo usuario (Alta)
exports.crearUsuario = (req, res) => {
    const { usuario, contrasena } = req.body; 

    if (!usuario || !contrasena) {
        return res.status(400).json({ error: 'Faltan campos: usuario y contrasena son requeridos.' });
    }
    
    // Simulación: En un entorno real, aquí iría el hash de la contraseña.
    const nuevoUsuario = { 
        id: proximoIdUsuario++, 
        usuario, 
        contrasena 
    }; 
    
    usuarios.push(nuevoUsuario);
    res.status(201).json({ 
        mensaje: 'Usuario registrado con éxito', 
        usuario: { id: nuevoUsuario.id, usuario: nuevoUsuario.usuario } 
    });
};

// GET: Obtener todos los usuarios (Lectura)
exports.obtenerUsuarios = (req, res) => {
    // En DB real: 'await Usuario.findAll()'
    res.status(200).json(usuarios);
};

// GET: Buscar usuario por ID (Lectura por ID)
exports.obtenerUsuarioPorId = (req, res) => {
    // El ID viene de la URL, es un string, lo convertimos a número
    const id = parseInt(req.params.id); 
    const usuarioEncontrado = usuarios.find(u => u.id === id);

    if (!usuarioEncontrado) {
        return res.status(404).json({ error: `Usuario con ID ${id} no encontrado.` });
    }
    
    // Se excluye la contraseña en la respuesta
    const { contrasena, ...usuarioLimpio } = usuarioEncontrado; 
    res.status(200).json(usuarioLimpio);
};

// PUT: Actualizar usuario (Modificación)
exports.actualizarUsuario = (req, res) => {
    const id = parseInt(req.params.id); 
    const { usuario, contrasena } = req.body; 
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `Usuario con ID ${id} no encontrado.` });
    }

    if (!usuario && !contrasena) {
        return res.status(400).json({ error: 'Debe proporcionar al menos el nuevo usuario o contraseña.' });
    }

    // Actualizamos solo los campos que vienen en el body
    if (usuario) usuarios[index].usuario = usuario;
    if (contrasena) usuarios[index].contrasena = contrasena; // En un entorno real, aquí se hashearía la nueva contraseña.

    // En DB real: 'await Usuario.update({ ... })'
    res.status(200).json({ 
        mensaje: `Usuario con ID ${id} actualizado con éxito.`, 
        usuario: { id: usuarios[index].id, usuario: usuarios[index].usuario } 
    });
};

// DELETE: Eliminar usuario (Baja / Eliminación)
exports.eliminarUsuario = (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `Usuario con ID ${id} no encontrado.` });
    }

    // Eliminamos el elemento del arreglo
    usuarios.splice(index, 1);
    // En DB real: 'await Usuario.destroy({ where: { id: id } })'

    res.status(200).json({ mensaje: `Usuario con ID ${id} eliminado con éxito.` });
};