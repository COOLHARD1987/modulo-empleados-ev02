const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/empleadoController');

// CRUD Routes
router.post('/', EmpleadoController.crearEmpleado);          // CREATE
router.get('/', EmpleadoController.obtenerEmpleados);        // READ ALL
router.get('/:id', EmpleadoController.obtenerEmpleado);      // READ ONE
router.put('/:id', EmpleadoController.actualizarEmpleado);   // UPDATE
router.delete('/:id', EmpleadoController.eliminarEmpleado);  // DELETE

module.exports = router;