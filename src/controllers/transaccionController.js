// api-bascula/src/controllers/transaccionController.js

// ⚠️ SIMULACIÓN DE DATOS (En memoria para Transacciones) ⚠️
let transacciones = [];
let proximoIdTransaccion = 1;

// Función auxiliar
const findTransaccionPendiente = (codigoCamion) => {
    return transacciones.find(t => 
        t.codigoCamion === codigoCamion && t.status === 'PENDIENTE_ENTRADA'
    );
};

// --- MÉTODO ENTRADA ---
exports.registrarEntrada = (req, res) => {
    const { codigoCamion, pesoTara, codigoCliente, codigoProducto } = req.body;

    if (!codigoCamion || pesoTara === undefined || !codigoCliente || !codigoProducto) {
        return res.status(400).json({ error: 'Faltan campos requeridos para la ENTRADA.' });
    }

    // 🚩 Validación: Código de camión ya tiene una entrada pendiente
    const transaccionPendiente = findTransaccionPendiente(codigoCamion);

    if (transaccionPendiente) {
        return res.status(409).json({
            error: `El código de camión ${codigoCamion} ya tiene una entrada pendiente.`,
            status: 'ERROR_DUPLICADO'
        });
    }

    // Crear la nueva transacción
    const nuevaTransaccion = {
        id: proximoIdTransaccion++,
        codigoCamion,
        pesoTara,
        codigoCliente, 
        codigoProducto, 
        fechaHoraEntrada: new Date().toISOString(),
        status: 'PENDIENTE_ENTRADA'
    };

    transacciones.push(nuevaTransaccion);
    // En DB real: 'await Transaccion.create({ ... })'

    res.status(201).json({
        mensaje: 'ENTRADA registrada con éxito. Pendiente de SALIDA.',
        transaccion: nuevaTransaccion
    });
};

// --- MÉTODO SALIDA ---
exports.registrarSalida = (req, res) => {
    const { codigoCamion, pesoBruto } = req.body;

    if (!codigoCamion || pesoBruto === undefined) {
        return res.status(400).json({ error: 'Faltan campos requeridos para la SALIDA: codigoCamion y pesoBruto.' });
    }
    
    // 🔍 Buscar la transacción PENDIENTE
    const transaccion = findTransaccionPendiente(codigoCamion);

    if (!transaccion) {
        return res.status(404).json({
            error: `No se encontró una entrada pendiente para el código ${codigoCamion}.`,
            status: 'ERROR_NO_ENTRADA'
        });
    }

    // Calcular y actualizar
    const pesoNeto = pesoBruto - transaccion.pesoTara;
    transaccion.pesoBruto = pesoBruto;
    transaccion.pesoNeto = pesoNeto;
    transaccion.fechaHoraSalida = new Date().toISOString();
    transaccion.status = 'COMPLETADA';

    // En DB real: 'await transaccion.update({ ... })'

    res.status(200).json({
        mensaje: 'SALIDA registrada y transacción COMPLETADA.',
        transaccion
    });
};

// --- MÉTODOS DE CONSULTA ---
exports.obtenerTransacciones = (req, res) => {
    res.status(200).json(transacciones);
};

exports.obtenerPendientes = (req, res) => {
    const pendientes = transacciones.filter(t => t.status === 'PENDIENTE_ENTRADA');
    res.status(200).json(pendientes);
};