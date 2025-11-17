const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
// const db = require('./config/db'); // Esta línea se usará más adelante para la conexión a MySQL

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo deseas

app.use(express.json());

/*
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200' // Reemplaza con la URL de tu frontend de Angular si es diferente
}));
*/

const routerBase = express.Router();
routerBase.use('/v1', apiRoutes);
app.use('/api', routerBase);


console.log('📋 Rutas disponibles en la API:');
apiRoutes.stack.forEach((r) => {
    if (r.route && r.route.path) {
        const method = Object.keys(r.route.methods)[0].toUpperCase();
        console.log(`   ${method} http://localhost:${PORT}/api/v1${r.route.path}`);
    }
});


app.use((req, res, next) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada.',
        mensaje: `La URL ${req.originalUrl} no existe en este servidor.`
    });
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor de Báscula corriendo en http://localhost:${PORT}`);
    console.log('✅ Los módulos CRUD y la lógica de Transacciones están cargados.');
    
    // Al integrar MySQL (próximo paso), aquí iría la prueba de conexión a la base de datos:
    /*
    db.authenticate()
      .then(() => console.log('✅ Conexión a MySQL establecida.'))
      .catch(err => console.error('❌ Error al conectar a la DB:', err));
    */
});
