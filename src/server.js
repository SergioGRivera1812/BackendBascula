import express from "express";
import cors from "cors";

// Importar todas las rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import camionRoutes from "./routes/camionRoutes.js";
import choferRoutes from "./routes/choferRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
//import proveedorRoutes from "./routes/proveedorRoutes.js";
import entradaRoutes from "./routes/entradaRoutes.js";
import salidaRoutes from "./routes/salidaRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/camiones", camionRoutes);
app.use("/api/choferes", choferRoutes);
app.use("/api/materiales", materialRoutes);
//app.use("/api/proveedores", proveedorRoutes);
app.use("/api/entrada", entradaRoutes);
app.use("/api/salida", salidaRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("API del sistema de báscula corriendo correctamente");
});

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
