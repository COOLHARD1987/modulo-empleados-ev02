/**
 * APLICACIÓN WEB - MÓDULO DE EMPLEADOS
 * Framework: Express.js
 * Evidencia: GA7-220501096-AA3-EV01
 * Autor: Jose David Vergara
 * Descripción: Servidor principal usando Express.js como framework web
 */

// IMPORTACIONES DEL FRAMEWORK EXPRESS.JS Y DEPENDENCIAS
const express = require('express'); // Framework principal
const bodyParser = require('body-parser'); // Middleware para parsing de datos
const cors = require('cors'); // Middleware para CORS
const path = require('path'); // Utilidad para manejo de rutas
const empleadoRoutes = require('./routes/empleadoRoutes'); // Rutas del módulo empleados

// CONFIGURACIÓN INICIAL DEL SERVIDOR EXPRESS
const app = express(); // Instancia de la aplicación Express
const PORT = process.env.PORT || 3000; // Puerto del servidor

// ======================
// MIDDLEWARES DEL FRAMEWORK
// ======================

/**
 * Middleware CORS - Permite peticiones desde diferentes dominios
 * Framework: Express.js con middleware cors
 */
app.use(cors());

/**
 * Middleware Body Parser - Convierte datos JSON en objetos JavaScript
 * Framework: Express.js con body-parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Middleware de archivos estáticos - Sirve archivos HTML, CSS, JS
 * Framework: Express.js static
 */
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// RUTAS DE LA APLICACIÓN
// ======================

/**
 * Rutas API RESTful para el módulo de empleados
 * Framework: Express.js Router
 */
app.use('/api/empleados', empleadoRoutes);

/**
 * Rutas principales de la aplicación web
 * Framework: Express.js route handling
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'empleados.html'));
});

app.get('/empleados.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'empleados.html'));
});

app.get('/modulo-empleados.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'modulo-empleados.html'));
});

app.get('/lista-empleados.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lista-empleados.html'));
});

// ======================
// INICIALIZACIÓN DEL SERVIDOR
// ======================

/**
 * Iniciar servidor web con Express.js
 * Framework: Express.js server
 */
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express.js ejecutándose en http://localhost:${PORT}`);
    console.log('📊 Framework: Express.js');
    console.log('💾 Base de datos SQLite inicializada');
    console.log('👥 Módulo de empleados listo');
});

// Exportar aplicación para testing
module.exports = app;