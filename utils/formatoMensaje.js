import moment from "moment"
import {customAlphabet} from "nanoid"

const msgID = customAlphabet("1234567890abcdef", 4)
const date = moment().format("D-MMM-YY,h:mm a")
///---- ///---- Metodo para darle formato y ID al mensaje del Chat
const formatoMensaje = (msg) => {
   return {
      author: {
         email: msg.author.email,
         nombre: msg.author.nombre,
         apellido: msg.author.apellido,
         edad: msg.author.edad,
         alias: msg.author.alias,
         avatar: msg.author.avatar,
      },
      text: msg.text,
      time: date,
      id: `m-${msgID()}`,
   }
}

export default formatoMensaje
