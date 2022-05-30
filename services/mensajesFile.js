import config from "../config/config.js"
import {promises as fs} from "fs"
import DAO from "./_mainDao.js"
import CustomError from "../helpers/errorClass.js"

class MensajesDAOFile extends DAO {
   constructor(ruta) {
      super()
      this.ruta = `${config.fileSystem.path}/mensajes.json`
   }
   async readData() {
      try {
         const data = await fs.readFile(this.ruta)
         const parseData = JSON.parse(data)
         return parseData
      } catch (error) {
         const err = new CustomError(500, "Error en ReadData", error)
         throw err
      }
   }
   //Metodo para encontrar un elemento por ID
   async readID(id) {
      try {
         const data = await this.readData()
         //console.log(data)
         const find = data.find((p) => p.id == id)
         //console.log(find)
         return find
      } catch (error) {
         const err = new CustomError(500, "Error en ReadID", error)
         throw err
      }
   }
   //Metodo para guardar un nuevo dato
   async guardarNuevo(data) {
      try {
         const array = await this.readData()
         array.push(data)

         await this.writeFile(array, "new data saved")
         return array
      } catch (error) {
         const err = new CustomError(500, "Error en GuardarNuevo", error)
         throw err
      }
   }
   // Metodo para actualizar datos
   async actualizar(data) {
      try {
         const array = await this.readData()
         const datoActual = array.findIndex((d) => d.id == data.id)
         console.log(datoActual)
         if (datoActual == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${elem.id}`)
         } else {
            array[datoActual] = data

            try {
               await this.writeFile(array, "Se Actualizó")
            } catch (error) {
               throw new Error(`Error al borrar: ${error}`)
            }
         }
      } catch (error) {
         const err = new CustomError(500, "Error en actualizar!", error)
         throw err
      }
   }
   //Metodo para borrar por ID

   async borrar(id) {
      try {
         const array = await this.readData()
         const datoActual = array.findIndex((d) => d.id == id)
         if (datoActual >= 0) {
            const borrados = array.filter((m) => m.id !== id)

            await this.writeFile(borrados, `Se borro el registro ${id}`)
            return {status: 200, msg: `Se borro el registro ${id}`}
         }
         return {status: 400, msg: `No existe el registro ${id}`}
      } catch (error) {
         const err = new CustomError(500, "Error en borrar!!", error)
         throw err
      }
   }
   // Metodo para guardar archivo con log incluido
   async writeFile(data, log) {
      try {
         const content = await fs.writeFile(this.ruta, JSON.stringify(data, null, 2))
         console.log(log ? log : "Guardado con Exito")

         return content
      } catch (error) {
         console.log("Error de escritura!", error)
      }
   }
}

export default MensajesDAOFile
