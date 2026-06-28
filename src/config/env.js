// Punto único de carga de variables de entorno (Node 20.12+).
// Se importa al inicio de cualquier módulo que lea process.env, garantizando
// que el archivo .env esté cargado antes de leer las variables.
// Si no existe .env, se usan los valores por defecto definidos en cada módulo.
try {
    process.loadEnvFile();
} catch {
    // No hay archivo .env: se continúa con los valores por defecto.
}
