const express = require('express');
const path = require('path');

const app = express();

// Configuración del puerto por variable de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middlewares para procesar datos de formularios y JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public' si existen
app.use(express.static(path.join(__dirname, 'public')));

// Ruta Principal - Sirve la vista index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Endpoint de Estado del Servidor Cloud (API Status)
app.get('/api/status', (req, res) => {
    const uptimeInSeconds = Math.floor(process.uptime());
    res.json({
        status: 'Online',
        environment: process.env.NODE_ENV || 'production',
        student: 'miguelangel angulo sossa',
        user: 'org744',
        repository: 'cloudapp',
        renderUrl: 'https://cloudapp-yhac.onrender.com',
        nodeVersion: process.version,
        uptimeSeconds: uptimeInSeconds,
        memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
        timestamp: new Date().toISOString()
    });
});

// Endpoint Interactivo - Procesa el Formulario de Contacto / Registro Simulado
app.post('/api/contact', (req, res) => {
    const { name, email, topic, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Por favor complete al menos el nombre y el correo electrónico.'
        });
    }

    const ticketId = `CLOUD-${Math.floor(100000 + Math.random() * 900000)}`;

    console.log(`[FORMULARIO RECIBIDO - ${ticketId}] De: ${name} (${email}) - Tema: ${topic}`);

    res.json({
        success: true,
        ticketId: ticketId,
        message: `¡Gracias ${name}! Tu solicitud en CloudApp fue procesada exitosamente en el servidor cloud.`,
        dataReceived: {
            name,
            email,
            topic: topic || 'General',
            submittedAt: new Date().toLocaleString('es-ES')
        }
    });
});

// Manejo de ruta no encontrada (404)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(` 🚀 CloudApp v2.0 - Servidor Cloud Iniciado`);
    console.log(` 👤 Estudiante: miguelangel angulo sossa (org744)`);
    console.log(` 🌐 URL Producción: https://cloudapp-yhac.onrender.com`);
    console.log(` 🔌 Puerto activo: ${PORT}`);
    console.log(`===================================================`);
});
