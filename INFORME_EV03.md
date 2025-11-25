# INFORME TÉCNICO - EV03
## Codificación de Módulos del Software Stand-alone, Web y Móvil

### Evidencia: GA7-220501096-AA3-EV01
### Proyecto: Sistema de Gestión de Empleados
### Empresa: Pollos y Huevos de Cundinamarca
### Framework: Express.js

## 1. INTRODUCCIÓN

Este informe documenta el desarrollo del sistema de gestión de empleados utilizando el framework Express.js para Node.js, cumpliendo con los requisitos de la evidencia GA7-220501096-AA3-EV01.

## 2. FRAMEWORK UTILIZADO

### Express.js
- **Tipo**: Framework web para Node.js
- **Características**: 
  - Sistema de enrutamiento robusto
  - Middleware para procesamiento de requests HTTP
  - Gestión de archivos estáticos
  - API RESTful completa
  - Arquitectura minimalista y flexible

## 3. ARQUITECTURA IMPLEMENTADA

### 3.1 Patrón MVC (Modelo-Vista-Controlador)
- **Models**: `Empleado.js` - Gestiona datos y operaciones de BD
- **Views**: Archivos HTML en `public/` - Interfaz de usuario
- **Controllers**: `empleadoController.js` - Lógica de negocio

### 3.2 Tecnologías Integradas
- **Backend**: Node.js + Express.js
- **Base de Datos**: SQLite3 con conexión JDBC
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Persistencia**: SQLite con transacciones JDBC

## 4. CARACTERÍSTICAS TÉCNICAS

### 4.1 Código Comentado
- Comentarios JSDoc en todos los métodos y clases
- Documentación de parámetros y valores de retorno
- Explicación de funcionalidades clave y lógica de negocio
- Comentarios de sección para mejor organización

### 4.2 Estándares de Codificación
- **Nomenclatura**: camelCase para variables y métodos
- **Estructura**: Modular y organizada por responsabilidades
- **Manejo de errores**: Try-catch con mensajes descriptivos
- **Separación**: Claramente definida entre capas MVC

### 4.3 Operaciones CRUD Implementadas

#### CREATE - Crear Empleado
- Endpoint: `POST /api/empleados`
- Campos: 21 campos de información personal, laboral y de seguridad social

#### READ - Consultar Empleados
- `GET /api/empleados` - Lista completa
- `GET /api/empleados/:id` - Empleado específico

#### UPDATE - Actualizar Empleado
- Endpoint: `PUT /api/empleados/:id`
- Actualización completa de todos los campos

#### DELETE - Eliminar Empleado
- Endpoint: `DELETE /api/empleados/:id`
- Eliminación segura con verificación

## 5. ESTRUCTURA DEL PROYECTO
