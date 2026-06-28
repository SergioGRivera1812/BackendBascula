import mysql from "mysql2/promise";

// Carga las variables del archivo .env si existe (Node 20.12+).
// Si no existe, se usan los valores por defecto y la app sigue funcionando.
try {
    process.loadEnvFile();
} catch {
    // No hay archivo .env: se usan los fallbacks de abajo.
}

// Configuración de la conexión (lee de variables de entorno con valores por defecto)
export const db = await mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "bascula",
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificar la conexión
try {
    const [rows] = await db.query("SELECT NOW() AS fecha");
    console.log("✅ Conexión a la base de datos exitosa. Fecha MySQL:", rows[0].fecha);
} catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
}
