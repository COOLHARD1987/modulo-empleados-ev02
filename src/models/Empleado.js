/**
 * MODELO EMPLEADO - MÓDULO EMPLEADOS
 * Framework: Express.js
 * Patrón: MVC (Modelo-Vista-Controlador)
 * Evidencia: GA7-220501096-AA3-EV01
 * Descripción: Modelo de datos para la entidad Empleado con operaciones CRUD
 */

const db = require('../config/database');

/**
 * CLASE EMPLEADO - Modelo de datos para la entidad Empleado
 * Gestiona las operaciones de base de datos usando JDBC con SQLite
 */
class Empleado {
    
    /**
     * CREAR NUEVO EMPLEADO - Operación CREATE
     * @param {Object} empleadoData - Datos del empleado a crear
     * @returns {Object} Empleado creado con ID generado
     * @throws {Error} Si hay error en la base de datos
     */
    static async crear(empleadoData) {
        try {
            // Consulta SQL parametrizada para prevenir inyecciones
            const sql = `
                INSERT INTO empleados (
                    nombre, tipoDocumento, documento, fechaNacimiento,
                    nacionalidad, estadoCivil, direccion, ciudad, telefono, correo,
                    cargo, departamento, tipoContrato, fechaIngreso, jornada,
                    salario, jefeInmediato, eps, afp, arl, cajaCompensacion
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            // Parámetros para la consulta SQL usando JDBC
            const params = [
                empleadoData.nombre,
                empleadoData.tipoDocumento,
                empleadoData.documento,
                empleadoData.fechaNacimiento,
                empleadoData.nacionalidad,
                empleadoData.estadoCivil,
                empleadoData.direccion,
                empleadoData.ciudad,
                empleadoData.telefono,
                empleadoData.correo,
                empleadoData.cargo,
                empleadoData.departamento,
                empleadoData.tipoContrato,
                empleadoData.fechaIngreso,
                empleadoData.jornada,
                empleadoData.salario,
                empleadoData.jefeInmediato,
                empleadoData.eps,
                empleadoData.afp,
                empleadoData.arl,
                empleadoData.cajaCompensacion
            ];

            // Ejecutar consulta INSERT usando JDBC
            const result = await db.run(sql, params);
            
            // Retornar empleado creado con ID generado
            return { id: result.id, ...empleadoData };
        } catch (error) {
            throw new Error(`Error al crear empleado en el modelo: ${error.message}`);
        }
    }

    /**
     * OBTENER TODOS LOS EMPLEADOS - Operación READ ALL
     * @returns {Array} Lista de todos los empleados ordenados por fecha de creación
     * @throws {Error} Si hay error en la consulta
     */
    static async obtenerTodos() {
        try {
            // Consulta SQL para obtener todos los empleados
            const sql = `SELECT * FROM empleados ORDER BY fecha_creacion DESC`;
            
            // Ejecutar consulta SELECT usando JDBC
            const empleados = await db.all(sql);
            return empleados;
        } catch (error) {
            throw new Error(`Error al obtener empleados en el modelo: ${error.message}`);
        }
    }

    /**
     * OBTENER EMPLEADO POR ID - Operación READ ONE
     * @param {number} id - ID del empleado a buscar
     * @returns {Object} Empleado encontrado o null si no existe
     * @throws {Error} Si hay error en la consulta
     */
    static async obtenerPorId(id) {
        try {
            // Consulta SQL parametrizada para buscar por ID
            const sql = `SELECT * FROM empleados WHERE id = ?`;
            
            // Ejecutar consulta SELECT con parámetro ID
            const empleado = await db.get(sql, [id]);
            return empleado;
        } catch (error) {
            throw new Error(`Error al obtener empleado en el modelo: ${error.message}`);
        }
    }

    /**
     * ACTUALIZAR EMPLEADO - Operación UPDATE
     * @param {number} id - ID del empleado a actualizar
     * @param {Object} empleadoData - Nuevos datos del empleado
     * @returns {Object} Resultado de la actualización
     * @throws {Error} Si hay error en la actualización
     */
    static async actualizar(id, empleadoData) {
        try {
            // Consulta SQL UPDATE con todos los campos
            const sql = `
                UPDATE empleados SET
                    nombre = ?, tipoDocumento = ?, documento = ?, fechaNacimiento = ?,
                    nacionalidad = ?, estadoCivil = ?, direccion = ?, ciudad = ?, telefono = ?,
                    correo = ?, cargo = ?, departamento = ?, tipoContrato = ?,
                    fechaIngreso = ?, jornada = ?, salario = ?, jefeInmediato = ?,
                    eps = ?, afp = ?, arl = ?, cajaCompensacion = ?
                WHERE id = ?
            `;

            // Parámetros para la consulta UPDATE
            const params = [
                empleadoData.nombre,
                empleadoData.tipoDocumento,
                empleadoData.documento,
                empleadoData.fechaNacimiento,
                empleadoData.nacionalidad,
                empleadoData.estadoCivil,
                empleadoData.direccion,
                empleadoData.ciudad,
                empleadoData.telefono,
                empleadoData.correo,
                empleadoData.cargo,
                empleadoData.departamento,
                empleadoData.tipoContrato,
                empleadoData.fechaIngreso,
                empleadoData.jornada,
                empleadoData.salario,
                empleadoData.jefeInmediato,
                empleadoData.eps,
                empleadoData.afp,
                empleadoData.arl,
                empleadoData.cajaCompensacion,
                id
            ];

            // Ejecutar consulta UPDATE usando JDBC
            const result = await db.run(sql, params);
            return result;
        } catch (error) {
            throw new Error(`Error al actualizar empleado en el modelo: ${error.message}`);
        }
    }

    /**
     * ELIMINAR EMPLEADO - Operación DELETE
     * @param {number} id - ID del empleado a eliminar
     * @returns {Object} Resultado de la eliminación
     * @throws {Error} Si hay error en la eliminación
     */
    static async eliminar(id) {
        try {
            // Consulta SQL DELETE parametrizada
            const sql = `DELETE FROM empleados WHERE id = ?`;
            
            // Ejecutar consulta DELETE usando JDBC
            const result = await db.run(sql, [id]);
            return result;
        } catch (error) {
            throw new Error(`Error al eliminar empleado en el modelo: ${error.message}`);
        }
    }
}

// Exportar clase del modelo para uso en controladores Express.js
module.exports = Empleado;