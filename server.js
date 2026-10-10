const express = require('express');
const path = require('path');

const app = express();

// Configuración del puerto mediante Variable de Entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos si se requieren en el futuro (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal que entrega el archivo HTML de la vista
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ruta de salud de la aplicación (Health Check API)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        student: 'miguelangel angulo sossa',
        user: 'org744',
        app: 'cloudapp'
    });
});

// Inicialización del servidor HTTP
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(` Servidor CloudApp iniciado exitosamente `);
    console.log(` Estudiante: miguelangel angulo sossa (org744)`);
    console.log(` Escuchando en el puerto: ${PORT}`);
    console.log(` Acceso local: http://localhost:${PORT}`);
    console.log(`===================================================`);
});
