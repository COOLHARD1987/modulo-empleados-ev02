const Empleado = require('../models/Empleado');

class EmpleadoController {
    // Crear nuevo empleado
    static async crearEmpleado(req, res) {
        try {
            console.log('📝 Recibiendo datos para nuevo empleado:', req.body);

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

            const nuevoEmpleado = await Empleado.crear(empleadoData);
            
            console.log('✅ Empleado creado exitosamente:', nuevoEmpleado.id);
            
            res.status(201).json({
                success: true,
                message: 'Empleado creado exitosamente',
                data: nuevoEmpleado
            });
        } catch (error) {
            console.error('❌ Error al crear empleado:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener todos los empleados
    static async obtenerEmpleados(req, res) {
        try {
            console.log('📋 Solicitando lista de empleados');
            const empleados = await Empleado.obtenerTodos();
            
            console.log(`✅ Encontrados ${empleados.length} empleados`);
            
            res.json({
                success: true,
                data: empleados
            });
        } catch (error) {
            console.error('❌ Error al obtener empleados:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener empleado por ID
    static async obtenerEmpleado(req, res) {
        try {
            const { id } = req.params;
            console.log(`🔍 Buscando empleado ID: ${id}`);
            
            const empleado = await Empleado.obtenerPorId(id);
            
            if (!empleado) {
                console.log('❌ Empleado no encontrado');
                return res.status(404).json({
                    success: false,
                    message: 'Empleado no encontrado'
                });
            }

            console.log('✅ Empleado encontrado:', empleado.nombre);
            
            res.json({
                success: true,
                data: empleado
            });
        } catch (error) {
            console.error('❌ Error al obtener empleado:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Actualizar empleado
    static async actualizarEmpleado(req, res) {
        try {
            const { id } = req.params;
            console.log(`✏️ Actualizando empleado ID: ${id}`, req.body);

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

            const result = await Empleado.actualizar(id, empleadoData);
            
            if (result.changes === 0) {
                console.log('❌ Empleado no encontrado para actualizar');
                return res.status(404).json({
                    success: false,
                    message: 'Empleado no encontrado'
                });
            }

            console.log('✅ Empleado actualizado exitosamente');
            
            res.json({
                success: true,
                message: 'Empleado actualizado exitosamente'
            });
        } catch (error) {
            console.error('❌ Error al actualizar empleado:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Eliminar empleado
    static async eliminarEmpleado(req, res) {
        try {
            const { id } = req.params;
            console.log(`🗑️ Eliminando empleado ID: ${id}`);
            
            const result = await Empleado.eliminar(id);
            
            if (result.changes === 0) {
                console.log('❌ Empleado no encontrado para eliminar');
                return res.status(404).json({
                    success: false,
                    message: 'Empleado no encontrado'
                });
            }

            console.log('✅ Empleado eliminado exitosamente');
            
            res.json({
                success: true,
                message: 'Empleado eliminado exitosamente'
            });
        } catch (error) {
            console.error('❌ Error al eliminar empleado:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = EmpleadoController;