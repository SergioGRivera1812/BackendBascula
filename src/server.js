import express from "express";
import cors from "cors";

// Importar todas las rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import camionRoutes from "./routes/camionRoutes.js";
import choferRoutes from "./routes/choferRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import proveedorRoutes from "./routes/proveedorRoutes.js";
import entradaRoutes from "./routes/entradaRoutes.js";
import salidaRoutes from "./routes/salidaRoutes.js";

const app = express();

// 1. Log de peticiones (Debe ir primero para capturar TODO)
app.use((req, res, next) => {
    const start = Date.now();
    const timestamp = new Date().toLocaleString();
    
    console.log("\n" + "=".repeat(70));
    console.log(`[${timestamp}] >>> NUEVA PETICIÓN`);
    console.log(`Método:    ${req.method}`);
    console.log(`URL:       ${req.originalUrl || req.url}`);
    console.log(`Origen:    ${req.get('origin') || 'Local/Otro'}`);
    
    if (Object.keys(req.query).length > 0) {
        console.log('Query Params:', JSON.stringify(req.query, null, 2));
    }
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toLocaleString()}] <<< RESPUESTA ENVIADA`);
        console.log(`Status:    ${res.statusCode}`);
        console.log(`Tiempo:    ${duration}ms`);
        console.log("=".repeat(70) + "\n");
    });

    next();
});

// 2. Configuración CORS
const corsOptions = {
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// 3. Otros middlewares
app.use(express.json());

// Log de datos del cuerpo (después de express.json)
app.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
        console.log('Datos recibidos (Body):', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/camiones", camionRoutes);
app.use("/api/choferes", choferRoutes);
app.use("/api/materiales", materialRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/entrada", entradaRoutes);
app.use("/api/salida", salidaRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("API del sistema de báscula corriendo correctamente");
});

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
    console.log("==================================================================");
    console.log(`SERVIDOR INICIADO EN: http://localhost:${PORT}`);
    console.log("==================================================================");
});
