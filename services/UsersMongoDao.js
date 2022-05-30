import config from "../config/config.js"
import {promises as fs} from "fs"
import DAO from "./_mainDao.js"
import CustomError from "../helpers/errorClass.js"
import UserModel from "../model/user.js"

class UsersDAOMongo extends DAO {
   constructor() {
      super()
      this.collection = UserModel
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

   async getUserByEmail(email) {
      return await this.collection.findOne({email: email})
   }
   async addFacebookUser(idFacebook, email, name, profilePhoto, source) {
      try {
         //console.log(idFacebook, email, name, profilePhoto, source)

         const user = new this.collection({
            idFacebook,
            email,
            name,
            profilePhoto,
            source: "facebook",
         })
         return user.save()
      } catch (error) {
         throw new Error(`Error al guardar: ${error}`)
      }
   }
}

export default UsersDAOMongo
