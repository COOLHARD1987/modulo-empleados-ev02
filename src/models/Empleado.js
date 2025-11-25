const db = require('../config/database');

class Empleado {
    // CREATE - Insertar nuevo empleado
    static async crear(empleadoData) {
        try {
            const sql = `
                INSERT INTO empleados (
                    nombre, tipoDocumento, documento, fechaNacimiento,
                    nacionalidad, estadoCivil, direccion, ciudad, telefono, correo,
                    cargo, departamento, tipoContrato, fechaIngreso, jornada,
                    salario, jefeInmediato, eps, afp, arl, cajaCompensacion
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

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

            const result = await db.run(sql, params);
            return { id: result.id, ...empleadoData };
        } catch (error) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    // READ - Obtener todos los empleados
    static async obtenerTodos() {
        try {
            const sql = `SELECT * FROM empleados ORDER BY fecha_creacion DESC`;
            const empleados = await db.all(sql);
            return empleados;
        } catch (error) {
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    // READ - Obtener empleado por ID
    static async obtenerPorId(id) {
        try {
            const sql = `SELECT * FROM empleados WHERE id = ?`;
            const empleado = await db.get(sql, [id]);
            return empleado;
        } catch (error) {
            throw new Error(`Error al obtener empleado: ${error.message}`);
        }
    }

    // UPDATE - Actualizar empleado
    static async actualizar(id, empleadoData) {
        try {
            const sql = `
                UPDATE empleados SET
                    nombre = ?, tipoDocumento = ?, documento = ?, fechaNacimiento = ?,
                    nacionalidad = ?, estadoCivil = ?, direccion = ?, ciudad = ?, telefono = ?,
                    correo = ?, cargo = ?, departamento = ?, tipoContrato = ?,
                    fechaIngreso = ?, jornada = ?, salario = ?, jefeInmediato = ?,
                    eps = ?, afp = ?, arl = ?, cajaCompensacion = ?
                WHERE id = ?
            `;

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

            const result = await db.run(sql, params);
            return result;
        } catch (error) {
            throw new Error(`Error al actualizar empleado: ${error.message}`);
        }
    }

    // DELETE - Eliminar empleado
    static async eliminar(id) {
        try {
            const sql = `DELETE FROM empleados WHERE id = ?`;
            const result = await db.run(sql, [id]);
            return result;
        } catch (error) {
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }
}

module.exports = Empleado;