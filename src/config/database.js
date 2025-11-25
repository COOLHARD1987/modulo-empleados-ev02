/**
 * CONFIGURACIÓN DE BASE DE DATOS - MÓDULO EMPLEADOS
 * Tecnología: SQLite3 con JDBC
 * Framework: Express.js
 * Patrón: Singleton para conexión única
 * Evidencia: GA7-220501096-AA3-EV01
 */

const sqlite3 = require('sqlite3').verbose(); // Driver JDBC para SQLite
const path = require('path');
const fs = require('fs');

// Configuración de rutas de base de datos
const dbDir = path.join(__dirname, '..', 'database');
const dbPath = path.join(dbDir, 'empleados.db');

/**
 * CLASE DATABASE - Gestiona conexión JDBC con SQLite
 * Implementa patrón Singleton para una única instancia
 */
class Database {
    
    /**
     * Constructor de la clase Database
     * Inicializa conexión JDBC con SQLite
     */
    constructor() {
        // Crear directorio si no existe
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        // Establecer conexión JDBC con SQLite
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('❌ Error conexión JDBC:', err.message);
            } else {
                console.log('✅ Conectado a SQLite via JDBC - Framework: Express.js');
                this.initDatabase(); // Inicializar esquema
            }
        });
    }

    /**
     * INICIALIZAR ESQUEMA DE BASE DE DATOS
     * Crea tabla empleados si no existe
     */
    initDatabase() {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS empleados (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                tipoDocumento TEXT NOT NULL,
                documento TEXT UNIQUE NOT NULL,
                fechaNacimiento TEXT,
                nacionalidad TEXT,
                estadoCivil TEXT,
                direccion TEXT,
                ciudad TEXT,
                telefono TEXT,
                correo TEXT,
                cargo TEXT,
                departamento TEXT,
                tipoContrato TEXT,
                fechaIngreso TEXT,
                jornada TEXT,
                salario REAL,
                jefeInmediato TEXT,
                eps TEXT,
                afp TEXT,
                arl TEXT,
                cajaCompensacion TEXT,
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;

        // Ejecutar consulta DDL
        this.db.run(createTableQuery, (err) => {
            if (err) {
                console.error('❌ Error al crear tabla:', err.message);
            } else {
                console.log('✅ Tabla "empleados" creada/verificada - Framework: Express.js');
            }
        });
    }

    /**
     * EJECUTAR CONSULTA CON PARÁMETROS
     * @param {string} sql - Consulta SQL
     * @param {Array} params - Parámetros para la consulta
     * @returns {Promise} Promesa con resultado
     */
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }

    /**
     * OBTENER UN REGISTRO
     * @param {string} sql - Consulta SQL
     * @param {Array} params - Parámetros
     * @returns {Promise} Promesa con registro único
     */
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    /**
     * OBTENER MÚLTIPLES REGISTROS
     * @param {string} sql - Consulta SQL
     * @param {Array} params - Parámetros
     * @returns {Promise} Promesa con array de registros
     */
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * CERRAR CONEXIÓN JDBC
     */
    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Error al cerrar conexión JDBC:', err.message);
            } else {
                console.log('Conexión JDBC cerrada correctamente');
            }
        });
    }
}

// Exportar instancia única (Singleton)
module.exports = new Database();