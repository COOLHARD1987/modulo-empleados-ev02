const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const empleadoRoutes = require('./routes/empleadoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/empleados', empleadoRoutes);

// Ruta principal - sirve el menú
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'empleados.html'));
});

// Rutas para servir los HTML directamente
app.get('/empleados.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'empleados.html'));
});

app.get('/modulo-empleados.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'modulo-empleados.html'));
});

app.get('/lista-empleados.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lista-empleados.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log('📊 Base de datos SQLite inicializada');
});

module.exports = app;