import config from "../config/config.js"
import {promises as fs} from "fs"
import DAO from "./_mainDao.js"
import CustomError from "../helpers/errorClass.js"
import ProductosModel from "../model/productosSchema.js"

class ProductosMongoDao extends DAO {
   constructor() {
      super()
      this.collection = ProductosModel
   }
   async readData() {
      try {
         const data = await this.collection.find({})
         //console.log(data)
         return data
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
         //console.log("EXISTEE!!", existe)
         const deleted = await this.collection.deleteOne({_id: id})

         return deleted
      } catch (error) {
         const err = new CustomError(500, "Error en borrar!!", error)
         throw err
      }
   }
   async actualizar(id, productoData) {
      try {
         console.log("DATA", productoData)

         let productoActual = await this.collection.findById(id)
         if (!productoActual) {
            return false
         }
         productoActual = await this.collection.findByIdAndUpdate(id, productoData, {
            new: true,
            runValidators: true,
            useUnified: true,
         })
         return productoActual
      } catch (error) {
         const err = new CustomError(500, "Error en borrar!!", error.message)
         throw err
      }
   }

   async getUserByEmail(email) {
      return await this.collection.findOne({email})
   }
   async insertManyData(manyData) {
      try {
         //console.log(manyData, "Desde ManyDAOMONGO")
         const data = await this.collection.insertMany(manyData)

         return
      } catch (error) {
         console.log("Error de escritura!", error)
         const err = new CustomError(500, "Error en insertMany!!", error)
         throw err
      }
   }
}

export default ProductosMongoDao
