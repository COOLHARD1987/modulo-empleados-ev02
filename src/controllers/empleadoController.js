/**
 * CONTROLADOR DE EMPLEADOS - MÓDULO EMPLEADOS
 * Framework: Express.js
 * Patrón: MVC (Modelo-Vista-Controlador)
 * Evidencia: GA7-220501096-AA3-EV01
 * Descripción: Gestiona la lógica de negocio para el CRUD de empleados
 */

const Empleado = require('../models/Empleado');

/**
 * CLASE EMPLEADOCONTROLLER - Controlador principal del módulo empleados
 * Maneja las operaciones CRUD mediante Express.js framework
 */
class EmpleadoController {
    
    /**
     * CREAR NUEVO EMPLEADO - Operación CREATE
     * @param {Object} req - Request de Express.js
     * @param {Object} res - Response de Express.js
     * @returns {JSON} Respuesta con resultado de la operación
     */
    static async crearEmpleado(req, res) {
        try {
            console.log('📝 Controlador: Creando nuevo empleado - Framework: Express.js');

            // Obtener datos del body request usando Express.js
            const empleadoData = {
                nombre: req.body.nombre,
                tipoDocumento: req.body.tipoDocumento,
                documento: req.body.documento,
                fechaNacimiento: req.body.fechaNacimiento,
                nacionalidad: req.body.nacionalidad,
                estadoCivil: req.body.estadoCivil,
                direccion: req.body.direccion,
                ciudad: req.body.ciudad,
                telefono: req.body.telefono,
                correo: req.body.correo,
                cargo: req.body.cargo,
                departamento: req.body.departamento,
                tipoContrato: req.body.tipoContrato,
                fechaIngreso: req.body.fechaIngreso,
                jornada: req.body.jornada,
                salario: req.body.salario,
                jefeInmediato: req.body.jefeInmediato,
                eps: req.body.eps,
                afp: req.body.afp,
                arl: req.body.arl,
                cajaCompensacion: req.body.cajaCompensacion
            };

            // Llamar al modelo para crear empleado en la base de datos
            const nuevoEmpleado = await Empleado.crear(empleadoData);
            
            console.log('✅ Controlador: Empleado creado exitosamente - ID:', nuevoEmpleado.id);
            
            // Enviar respuesta JSON usando Express.js framework
            res.status(201).json({
                success: true,
                message: 'Empleado creado exitosamente usando Express.js framework',
                data: nuevoEmpleado
            });
        } catch (error) {
            console.error('❌ Controlador: Error al crear empleado:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * OBTENER TODOS LOS EMPLEADOS - Operación READ ALL
     * @param {Object} req - Request de Express.js
     * @param {Object} res - Response de Express.js
     * @returns {JSON} Lista de todos los empleados
     */
    static async obtenerEmpleados(req, res) {
        try {
            console.log('📋 Controlador: Obteniendo lista de empleados - Framework: Express.js');
            
            // Obtener todos los empleados desde el modelo
            const empleados = await Empleado.obtenerTodos();
            
            console.log(`✅ Controlador: ${empleados.length} empleados encontrados`);
            
            // Enviar respuesta JSON con Express.js
            res.json({
                success: true,
                data: empleados,
                message: 'Lista obtenida usando Express.js framework'
            });
        } catch (error) {
            console.error('❌ Controlador: Error al obtener empleados:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * OBTENER EMPLEADO POR ID - Operación READ ONE
     * @param {Object} req - Request de Express.js
     * @param {Object} res - Response de Express.js
     * @returns {JSON} Datos del empleado específico
     */
    static async obtenerEmpleado(req, res) {
        try {
            const { id } = req.params; // Obtener parámetro de ruta con Express.js
            console.log(`🔍 Controlador: Buscando empleado ID: ${id} - Framework: Express.js`);
            
            // Buscar empleado por ID en el modelo
            const empleado = await Empleado.obtenerPorId(id);
            
            if (!empleado) {
                console.log('❌ Controlador: Empleado no encontrado');
                return res.status(404).json({
                    success: false,
                    message: 'Empleado no encontrado'
                });
            }

            console.log('✅ Controlador: Empleado encontrado:', empleado.nombre);
            
            // Enviar respuesta con Express.js
            res.json({
                success: true,
                data: empleado,
                message: 'Empleado obtenido usando Express.js framework'
            });
        } catch (error) {
            console.error('❌ Controlador: Error al obtener empleado:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * ACTUALIZAR EMPLEADO - Operación UPDATE
     * @param {Object} req - Request de Express.js
     * @param {Object} res - Response de Express.js
     * @returns {JSON} Resultado de la actualización
     */
    static async actualizarEmpleado(req, res) {
        try {
            const { id } = req.params; // Obtener ID de parámetro de ruta
            console.log(`✏️ Controlador: Actualizando empleado ID: ${id} - Framework: Express.js`);

            // Obtener datos actualizados del body request
            const empleadoData = {
                nombre: req.body.nombre,
                tipoDocumento: req.body.tipoDocumento,
                documento: req.body.documento,
                fechaNacimiento: req.body.fechaNacimiento,
                nacionalidad: req.body.nacionalidad,
                estadoCivil: req.body.estadoCivil,
                direccion: req.body.direccion,
                ciudad: req.body.ciudad,
                telefono: req.body.telefono,
                correo: req.body.correo,
                cargo: req.body.cargo,
                departamento: req.body.departamento,
                tipoContrato: req.body.tipoContrato,
                fechaIngreso: req.body.fechaIngreso,
                jornada: req.body.jornada,
                salario: req.body.salario,
                jefeInmediato: req.body.jefeInmediato,
                eps: req.body.eps,
                afp: req.body.afp,
                arl: req.body.arl,
                cajaCompensacion: req.body.cajaCompensacion
            };

            // Llamar al modelo para actualizar empleado
            const result = await Empleado.actualizar(id, empleadoData);
            
            if (result.changes === 0) {
                console.log('❌ Controlador: Empleado no encontrado para actualizar');
                return res.status(404).json({
                    success: false,
                    message: 'Empleado no encontrado'
                });
            }

            console.log('✅ Controlador: Empleado actualizado exitosamente');
            
            // Enviar respuesta con Express.js
            res.json({
                success: true,
                message: 'Empleado actualizado usando Express.js framework'
            });
        } catch (error) {
            console.error('❌ Controlador: Error al actualizar empleado:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * ELIMINAR EMPLEADO - Operación DELETE
     * @param {Object} req - Request de Express.js
     * @param {Object} res - Response de Express.js
     * @returns {JSON} Resultado de la eliminación
     */
    static async eliminarEmpleado(req, res) {
        try {
            const { id } = req.params; // Obtener ID de parámetro de ruta
            console.log(`🗑️ Controlador: Eliminando empleado ID: ${id} - Framework: Express.js`);
            
            // Llamar al modelo para eliminar empleado
            const result = await Empleado.eliminar(id);
            
            if (result.changes === 0) {
                console.log('❌ Controlador: Empleado no encontrado para eliminar');
                return res.status(404).json({
                    success: false,
                    message: 'Empleado no encontrado'
                });
            }

            console.log('✅ Controlador: Empleado eliminado exitosamente');
            
            // Enviar respuesta con Express.js
            res.json({
                success: true,
                message: 'Empleado eliminado usando Express.js framework'
            });
        } catch (error) {
            console.error('❌ Controlador: Error al eliminar empleado:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

// Exportar clase del controlador para uso en rutas Express.js
module.exports = EmpleadoController;