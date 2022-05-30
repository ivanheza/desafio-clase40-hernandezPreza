import mongoose from "mongoose"
import moment from "moment"
const date = moment().format("D-MMM-YY,h:mm a")

const Schema = mongoose.Schema

const mensajeSchema = new Schema({
   author: {
      email: {type: String},
      nombre: {type: String},
      apellido: {type: String},
      edad: {type: Number},
      alias: {type: String},
      avatar: {type: String},
   },
   text: {type: String},
   time: {type: String, default: date},
})

const MensajeModel = mongoose.model("Mensajes", mensajeSchema)
export default MensajeModel
