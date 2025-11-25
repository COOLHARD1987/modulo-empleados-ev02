/**
 * RUTAS DE EMPLEADOS - MÓDULO EMPLEADOS
 * Framework: Express.js Router
 * Evidencia: GA7-220501096-AA3-EV01
 * Descripción: Configuración de rutas RESTful API para el módulo de empleados
 */

const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/empleadoController');

// ======================
// CONFIGURACIÓN DE RUTAS RESTful
// ======================

/**
 * RUTA POST - Crear nuevo empleado
 * Endpoint: POST /api/empleados
 * Framework: Express.js Router
 * Descripción: Recibe datos de empleado y los almacena en la base de datos
 */
router.post('/', EmpleadoController.crearEmpleado);

/**
 * RUTA GET - Obtener todos los empleados
 * Endpoint: GET /api/empleados
 * Framework: Express.js Router
 * Descripción: Retorna lista completa de empleados ordenada por fecha de creación
 */
router.get('/', EmpleadoController.obtenerEmpleados);

/**
 * RUTA GET - Obtener empleado específico por ID
 * Endpoint: GET /api/empleados/:id
 * Framework: Express.js Router con parámetros de ruta
 * Descripción: Retorna un empleado específico basado en su ID
 */
router.get('/:id', EmpleadoController.obtenerEmpleado);

/**
 * RUTA PUT - Actualizar empleado existente
 * Endpoint: PUT /api/empleados/:id
 * Framework: Express.js Router con parámetros de ruta
 * Descripción: Actualiza los datos de un empleado existente basado en su ID
 */
router.put('/:id', EmpleadoController.actualizarEmpleado);

/**
 * RUTA DELETE - Eliminar empleado
 * Endpoint: DELETE /api/empleados/:id
 * Framework: Express.js Router con parámetros de ruta
 * Descripción: Elimina un empleado de la base de datos basado en su ID
 */
router.delete('/:id', EmpleadoController.eliminarEmpleado);

// Exportar router configurado para uso en aplicación Express.js
module.exports = router;