import mysql from "mysql2/promise";

// Configuración de la conexión
export const db = await mysql.createPool({
    host: "localhost",       // Cambia si tu host es distinto
    user: "root",            // Tu usuario de MySQL
    password: "root", // Tu contraseña de MySQL
    database: "bascula",     // Nombre de la base de datos
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