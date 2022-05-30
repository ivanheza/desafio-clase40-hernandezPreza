import config from "../config/config.js"
import {promises as fs} from "fs"
import DAO from "./_mainDao.js"
import CustomError from "../helpers/errorClass.js"
import MensajeModel from "../model/mensajeSchema.js"

class MensajesDAOMongo extends DAO {
   constructor() {
      super()
      this.collection = MensajeModel
   }
   async readData() {
      try {
         const data = await this.collection.find({})

         //console.log("DATA MENSAJES", data)
         return data.map((mensaje) => ({...mensaje._doc}))
      } catch (error) {
         const err = new CustomError(500, "Error en ReadData", error)
         throw err
      }
   }
   //Metodo para encontrar un elemento por ID
   async readID(id) {
      try {
         const elem = await this.collection.findOne({_id: id})
         return elem
      } catch (error) {
         const err = new CustomError(500, "Error en ReadID", error)
         throw err
      }
   }
   //Metodo para guardar un nuevo dato
   async guardarNuevo(data) {
      try {
         let doc = await this.collection.create(data)
         return doc
      } catch (error) {
         const err = new CustomError(500, "Error en GuardarNuevo", error)
         throw err
      }
   }
   // Metodo para actualizar datos

   //Metodo para borrar por ID

   async borrar(id) {
      try {
         const existe = await this.collection.findOne({_id: id})
         if (!existe) {
            return false
         }
         console.log(existe)
         await this.collection.deleteOne({_id: id})
      } catch (error) {
         const err = new CustomError(500, "Error en borrar!!", error)
         throw err
      }
   }
   async find(email) {
      try {
         const data = await this.collection.findOne({email: email})

         //console.log(data)
         return data
      } catch (error) {
         console.log(error)
         return false
      }
   }
   async getUserByEmail(email) {
      return await this.collection.findOne({email})
   }
}

export default MensajesDAOMongo
