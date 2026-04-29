/*
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    Había hecho una versión un poquito más "compleja" que incluía "gráficos" ASCII rudimentarios (detalles de vieja escuela jaja) pero corregí el código original
    para que funcionara bien con tu script para testearlo. Además, tiene toda la lógica y es lo que se pide retornar el JSON "tal cual" digamos.
    También se puede probar "descomentando" el "if" de "createFile()" que tuve que comentar porque si no el script para testear me tiraba error en la segunda ejecución,
    dado que yo simulo una base de datos local con el "products.json" y por ende los cambios se hacían permanentes (eliminar el producto, por ejemlo) hasta que
    recarcagara nuevamente todos los datos desde Fake Store API al archivo JSON local 
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
*/

//import chalk from "chalk"; 
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

const method = args[0];
const resource = args[1];
const extra = args.slice(2);

const BASE_URL = "https://fakestoreapi.com/products";
const FILE_PATH = path.resolve("./products.json");

// Iba a hacer que únicamente cargara el archivo JSON que simula la "base de datos" si no existía el archivo, pero de esta forma, ejecutándose siempre, ya no me tira error
// la segund vez que ejecuto el test con tu script de "Testing-Pre-Entrega-Back-End-Node-JS". Por eso comenté el "if" que verifica si existe el archivo JSON para decidir si hace la carga
/***  MANIPULACIÓN DEL ARCHIVO JSON ("BASE DE DATOS") ***/
async function createFile(force) {
  //if (!fs.existsSync(FILE_PATH) || force) {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  if (!res || !data) {
    console.log("¡Error creando base de datos!");
  } else {
    writeProducts(data);
    //}
  }
}

/** Lee los producos desde el archivo y los retorna **/
function readProducts() {
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data);
}

/** Escribe los datos al archivo **/
function writeProducts(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// Tenía sentido cuando en "createFile()" solo cargaba desde la API si el archivo no existía
// Lo dejo igual aunque ahora carga siempre desde la API cuando inicia si no "descomentás" el "if" en "createFile()"
/***  RECARGA LOS PRODUCTOS ***/
if (method === "LOAD" && resource === "products") {
  createFile(true);
}

// Siempre renueva el archivo debido a que la condición para verificar su existencia stá comentada.
/***  CREA ARCHIVO JSON ***/
await createFile();

/***  OBTIENE TODOS LOS PRODUCTOS ***/
if (method === "GET" && resource === "products") {
  const data = readProducts();
  if (!data) {
    //console.log(chalk.red("¡Productos no encontrados!"));
    console.log("¡Productos no encontrados!");
  } else {
    console.log(data);
  }
}

/***  OBTIENE PRODUCTOS POR ID ***/
if (
  method === "GET" &&
  resource.startsWith("products/") &&
  !resource.includes("?title=")
) {
  const [, id] = resource.split("/");
  const data = readProducts();
  const product = data.find((p) => p.id == id);
  if (!product) {
    //console.log(chalk.red("¡Productos no encontrados!"));
    console.log("¡Producto no encontrado!");
  } else {
    console.log(product);
  }
}

// Acá me puse a experimentar un toque como para agregar algo más
// También se podrían editar o crear productos con este formato
/*** OBTIENE PRODUCTO POR TÍTULO/NOMBRE ***/
if (method === "GET" && resource.startsWith("products/?title=")) {
  const [, queryString] = resource.split("?");
  const data = readProducts();
  if (!queryString) {
    console.log(
      `\nTenés que usar el query "products/?title=Nombre de producto"`,
    );
    process.exit(0);
  }
  const params = new URLSearchParams(queryString);
  const title = params.get("title");
  /*
   if (!title) {
     console.log(
       `\nTenés que usar el query "products/?title=Nombre de producto"`,
     );
     process.exit(1);
   }
   */
  const product = data.find(
    (p) => p.title.toLowerCase().trim() === title.toLowerCase().trim(),
  );
  if (!product) {
    //console.log(chalk.red("¡Productos no encontrados!"));
    console.log("¡Producto no encontrado!");
  } else {
    console.log(product);
  }
}

/*** CREA PRODUCTO NUEVO ***/
if (method === "POST" && resource === "products") {
  const [title, price, description, category] = extra;
  const data = readProducts();
  const newProduct = {
    id: data.length ? Math.max(...data.map((p) => p.id)) + 1 : 1,
    title,
    price,
    description,
    category,
    rating: { rate: 0, count: 0 },
  };
  data.push(newProduct);
  writeProducts(data);
  console.log(newProduct);
}

/*** BORRA PRODUCTO POR ID ***/
if (method === "DELETE" && resource.startsWith("products/")) {
  const [, id] = resource.split("/");
  let data = readProducts();
  const product = data.find((p) => p.id == id);
  data = data.filter((p) => p.id != id);
  writeProducts(data);
  if (!product) {
    //console.log(chalk.red("¡Productos no encontrados!"));
    console.log("¡Producto no encontrado!");
  } else {
    console.log(product);
  }
}

/*** EDITA PRODUCTO POR ID ***/
if (method === "EDIT" && resource.startsWith("products/")) {
  const [, id] = resource.split("/");
  let data = readProducts();
  const product = data.find((p) => p.id == id);
  if (!product) {
    //console.log(chalk.red("¡Productos no encontrados!"));
    console.log("¡Producto no encontrado!");
  } else {
    console.log(product);
  }
  const index = data.findIndex((p) => p.id == id);
  if (index === -1) {
    //console.log(chalk.red("¡Productos no encontrados!"));
    console.log("¡Producto no encontrado!");
    process.exit(1);
  }
  let [title, price, description, category] = extra;
  if (title === "" || title === undefined) {
    title = data[index].title;
  }
  if (price === "" || price === undefined) {
    price = data[index].price;
  }
  if (description === "" || description === undefined) {
    description = data[index].description;
  }
  if (category === "" || category === undefined) {
    category = data[index].category;
  }
  const updatedProduct = {
    id: Number(id),
    title,
    price,
    description,
    category,
    rating: { rate: 0, count: 0 },
  };
  data[index] = updatedProduct;
  writeProducts(data);
  console.log(updatedProduct);
}
