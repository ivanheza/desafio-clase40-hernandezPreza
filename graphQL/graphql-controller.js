import ProductosMongoDao from "../services/productosMongo.js"
import ProductosDAOFile from "../services/productosFileDao.js"
import productoDTO from "../DTO/productoDTO.js"
import config from "../config/config.js"
import logger from "../helpers/winston.js"

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

export async function getProducts() {
   try {
      const data = await persistencia.readData()

      return data
   } catch (error) {
      logger.error(`${error} -  "Ocurrio un error al cargar los productos"`)
   }
}
export async function getProduct(id) {
   try {
      let {_id} = id
      let product = await persistencia.readID(_id)
      return product
   } catch (error) {
      logger.error(`${error} -  "Ocurrio un error al buscar el producto. Revisa el ID"`)
   }
}
export async function newProduct({input}) {
   try {
      const newProd = productoDTO(input)

      const savedProd = await persistencia.guardarNuevo(newProd)
      return savedProd
   } catch (error) {
      logger.error(`${error} -  "Ocurrio un error al crear el producto nuevo."`)
   }
}
export async function editProduct({_id, data}) {
   try {
      console.log(_id)
      console.log(data)
      const edited = await persistencia.actualizar(_id, data)

      return edited
   } catch (error) {
      logger.error(`${error} -  "Ocurrio un error al cargar los productos"`)
   }
}
export async function deleteProduct({_id}) {
   try {
      console.log(_id)
      let borrado = await persistencia.borrar(_id)
      return borrado
   } catch (error) {
      console.log(error)
      logger.error(`${error} -  "Ocurrio un error al cargar los productos"`)
   }
}
