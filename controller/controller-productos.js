import {generarProductos} from "../mocks/mockP.js"
import logger from "../helpers/winston.js"
import {generarNumeros} from "../helpers/process-child.js"
import config from "../config/config.js"
import ProductosMongoDao from "../services/productosMongo.js"
import ProductosDAOFile from "../services/productosFileDao.js"
import productoDTO from "../DTO/productoDTO.js"

let persistencia

switch (config.persistencia) {
   case "MONGO":
      persistencia = new ProductosMongoDao()
      break
   case "FS":
      persistencia = new ProductosDAOFile()
      break
   default:
      break
}

export const testProductos = async (req, res) => {
   try {
      const {url, method} = req
      logger.info(`Metodo: ${method} - Ruta: ${url}`)
      ///---- se genera los Mocks
      const productosNuevos = generarProductos(5)
      //console.log(productosNuevos)
      const data = await persistencia.insertManyData(productosNuevos)

      res.redirect("/home")
   } catch (error) {
      console.log(error)
      logger.error(`${error} -  "Ocurrio un error al insertar los Mocks"`)
   }
}

export const borrarProducto = async (req, res) => {
   try {
      console.log(req.params)
      const {id} = req.params
      await persistencia.borrar(id)
      res.redirect("/home")
   } catch (err) {
      // 👇️ This runs
      console.log("Error: ", err)
   }
}

export const randomNumbers = async (req, res) => {
   const {url, method} = req
   logger.info(`Metodo: ${method} - Ruta: ${url}`)
   ///---- se genera los Mocks

   //
   let cant = req.query.cant
   //const forked = fork("process-child.js")
   if (!cant) {
      const numeros = generarNumeros(1000000)
      const duplicated = numeros.reduce((acc, value) => {
         return {...acc, [value]: (acc[value] || 0) + 1}
      }, {})
      console.log("first")
      res.send(duplicated)
   } else {
      console.log(cant, "cantidad")
      const numeros = generarNumeros(cant)
      const duplicated = numeros.reduce((acc, value) => {
         return {...acc, [value]: (acc[value] || 0) + 1}
      }, {})
      res.send(duplicated)
   }
}

////////////////////////////////WEB Sockets CONTROLLER////////////////////////////////

export const productosSockets = async (socket, sockets) => {
   try {
      ///Carga productos para cada socket
      const data = await persistencia.readData()

      socket.emit("loadProducts", data)
   } catch (error) {
      logger.error(`${error} -  "Ocurrio un error al cargar los productos"`)
   }
   //nuevo porducto
   socket.on("newProduct", async (product) => {
      //console.log(product)
      try {
         const newProd = await productoDTO(product)
         // console.log(newProd)
         await persistencia.guardarNuevo(newProd)

         sockets.emit("newProduct", newProd)
      } catch (error) {
         logger.error(`${error} -  "Ocurrio un error al cargar los productos"`)
      }
   })
   //Socket para borrar producto
   socket.on("deleteProduct", async (id) => {
      try {
         ///holas
         //console.log(id)
         await persistencia.borrar(id)
         /// se cargan los productos para los sockets
         sockets.emit("loadProducts", await persistencia.readData())
      } catch (error) {
         logger.error(error)
      }
   })
   //se define socket para escoger un solo producto, esto con la finalidad de poder hacer uso del boton borrar
   socket.on("getProduct", async (id) => {
      const listaProductos = await persistencia.readData()
      const product = listaProductos.find((p) => p.id == id)
      //console.log(product)
      socket.emit("selectedProduct", product)
   })
}
