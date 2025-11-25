const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Crear directorio database si no existe
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'empleados.db');

class Database {
    constructor() {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('❌ Error al conectar con la base de datos:', err.message);
            } else {
                console.log('✅ Conectado a la base de datos SQLite.');
                this.initDatabase();
            }
        });
    }

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

        this.db.run(createTableQuery, (err) => {
            if (err) {
                console.error('❌ Error al crear la tabla:', err.message);
            } else {
                console.log('✅ Tabla "empleados" verificada/creada correctamente.');
            }
        });
    }

    // Método para ejecutar consultas
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

    // Método para obtener un registro
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

    // Método para obtener múltiples registros
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

    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Error al cerrar la base de datos:', err.message);
            } else {
                console.log('Conexión a la base de datos cerrada.');
            }
        });
    }
}

module.exports = new Database();