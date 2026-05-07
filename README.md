# 📦 Gestor de productos por terminal o consola - Curso Node.js de Talento Tech - Comisión 26134
<span style="font-size: 1.5rem;">🚧 **PREENTREGA** 🚧</span>

Esta es una aplicación para terminal (CLI) desarrollada como **preentrega** del curso **Node.js** de **Talento Tech**.

La aplicación permite gestionar un listado de productos obtenidos desde la [Fake Store API](https://fakestoreapi.com/), almacenándolos localmente en un archivo JSON y ofreciendo operaciones de **listar, buscar, crear y eliminar** productos directamente desde la terminal.

---

## 🛠️ Requisitos previos

Antes de ejecutar el proyecto, tenés que instalar:

- <img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="Node.js" width="36" height="36" style="vertical-align: middle; display: inline;"/> (Node.js versión 18 o superior recomendada)  
  → [Descargar Node.js](https://nodejs.org/)

- <img src="https://img.icons8.com/color/48/000000/npm.png" alt="Node.js" width="36" height="36" style="vertical-align: middle; display: inline;"/> (npm viene incluido con Node.js)  
  → Podés verificar las versiones con:

```bash
node -v
npm -v
```

---

## ⚙️ Instalación y configuración

### 🔴 Opción 1: Clonar con Git (recomendado)

1. **Abrí una terminal** (Git Bash, PowerShell, CMD o la terminal integrada de VS Code).

2. **Cloná el repositorio** ejecutando:

```bash
git clone https://github.com/jmp-software/curso-node-js-preentrega-jmp.git
```

>📌 Si no tenés <img src="https://img.icons8.com/color/48/git.png" width="20" style="vertical-align: middle; display: inline;"/>**Git instalado**, descargalo desde https://git-scm.com/

3. **Entrá en la carpeta del proyecto**:

```bash
cd curso-node-js-preentrega-jmp
```

### 🟠 Opción 2: Descargar como ZIP (sin Git)

1. Entrá a: [https://github.com/jmp-software/curso-node-js-preentrega-jmp](https://github.com/jmp-software/curso-node-js-preentrega-jmp)
2. Hacé clic en el botón verde **"Code"**
3. Seleccioná **"Download ZIP"**
4. Descomprimí el archivo en el disco
5. Abrí una terminal dentro de la carpeta descomprimida

---

## ▶️ Cómo ejecutar la aplicación

La aplicación se ejecuta con el siguiente comando base:

```bash
npm start <MÉTODO> <RECURSO> [datos extra]
```

También podés usar Node directamente:

```bash
node index.js <MÉTODO> <RECURSO> [datos extra]
```

---

## 🧑‍💻 Comandos disponibles

### 1. Obtener todos los productos

```bash
npm start GET products
```

### 2. Obtener un producto por ID

```bash
npm start GET products/1
```

### 3. Obtener un producto por título

```bash
npm start GET "products?title=producto ejemplo"
```

> El **_recurso_** y los **_datos extra_** deben respetar una estructura similar a la de una URL imitando un "query" en el cual se pasa como parámetro el título/nombre del producto.

> Sintaxis: **_npm start GET "products?title=\<NOMBRE DEL PRODUCTO\>"_**

### 4. Crear un nuevo producto

```bash
npm start POST products "Nombre del producto" 19.99 "Descripción del producto" "categoría del producto"
```
> Los argumentos deben ir en este orden: título, precio, categoría, descripción.

### 5. Editar un producto por ID

```bash
npm start PATCH products/3 "Nuevo nombre del producto" 29.99 "Nueva descripción del producto" "nueva categoría del producto"
```
> Los argumentos que desean mantenerse igual, pueden omitirse escribiendo dos comillas contiguas vacías (**""** o **''**).

> Sintaxis: **_npm run start PATCH products/1 "\<NOMBRE NUEVO DEL PRODUCTO\>"  "" "" "\<CATEGORÍA NUEVA DEL PRODUCTO\>"_**

### 6. Eliminar un producto por ID

```bash
npm start DELETE products/3
```
### 7. Recargar los datos desde la API (reiniciar archivo)

```bash
npm start LOAD products
```

> Esto vuelve a traer todos los productos desde la Fake Store API y reemplaza el archivo local.

---

## 📁 Archivos principales

- `index.js` → Código principal de la aplicación.
- `products.json` → Archivo local donde se guardan los productos (se crea automáticamente al ejecutar la aplicación por primera vez y cada vez que no lo encuentra).
- `package.json` → Dependencias y scripts del proyecto.
- `package-lock.json` → Bloqueo de versiones de las dependencias.

---

## 🧠 Funcionamiento interno

1. Al iniciar, la aplicación verifica si existe `products.json`.  
   Si no existe, descarga los productos desde la API y los guarda localmente.

2. Los comandos se interpretan desde los argumentos de la terminal (`process.argv`).

3. El archivo JSON actúa como una "**base de datos**" local para realizar el CRUD.

4. Los nuevos productos creados con `POST` se guardan en el JSON con un `id` que se adjudica incrementándose automáticamente.

5. El proyecto usa **módulos ES (ES Modules)** gracias a `"type": "module"` en el `package.json`.

---

## 📎 Información adicional

### Scripts para testeo

El proyecto incluye tres scripts que ejecutan **comandos automáticamente** para facilitar el testeo de la aplicación:

| Script | Sistema Operativo| Ejecución | Codificación |
|--------|---------|-----------|-----------|
  `test` | Linux / macOS | `./test` | UTF-8 LF  |
| `test.bat` | Windows (CMD) | `test.bat` | Windows 1252 CRLF |
| `test.ps1` | Windows (PowerShell) | `.\test.ps1` | Windows 1252 CRLF |

**Antes de ejecutar:**
- En Linux/macOS: verificar primero si hay que dar permiso con → `chmod +x test`
- En PowerShell: si da error de seguridad → `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

**Lo que hace cada script:**
1. Da la opción para recargar los datos desde la API (LOAD)
2. Ejecuta `GET products` → muestra todos los productos
3. Ejecuta `GET products/1` → muestra el producto con ID 1
4. Ejecuta `GET "products?title=Nombre de producto"` → busca un producto por título/nombre 
5. Ejecuta `POST products` → crea un producto 
6. Ejecuta `PATCH products/1` → edita los datos de un producto ya existente, en este caso el de ID 1
7. Ejecuta `DELETE products/1` → elimina el producto con ID 1

---