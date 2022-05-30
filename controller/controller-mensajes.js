import formatoMensaje from "../utils/formatoMensaje.js"
import normalizeMsgs from "../utils/normalizeMsg.js"
import logger from "../helpers/winston.js"
import config from "../config/config.js"
import MensajesDAOMongo from "../services/mensajesMongo.js"
import MensajesDAOFile from "../services/mensajesFile.js"

let persistencia
console.log(config.persistencia)

switch (config.persistencia) {
   case "MONGO":
      persistencia = new MensajesDAOMongo()
      break
   case "FS":
      persistencia = new MensajesDAOFile()
      break
   default:
      break
}

const mensajesSockets = async (socket, sockets) => {
   ///
   try {
      const data = normalizeMsgs(await persistencia.readData())

      //console.log(data, "Desde DAta")
      ///---- se mandan los mensajes normalizados a todos los sockets
      socket.emit("mensajes", data)
   } catch (error) {
      logger.error(error + "Ocurrio un error al cargar los mensajes")
   }

   socket.on("chatMessage", async (mensaje) => {
      try {
         let newmsg = formatoMensaje(mensaje)
         //logger.info(newmsg)
         //console.log(newmsg)
         await persistencia.guardarNuevo(newmsg)
         ///---- se mandan los mensajes a todos los sockets ya normalizados

         sockets.emit("mensajes", normalizeMsgs(await persistencia.readData()))
      } catch (error) {
         logger.error(error)
      }
   })
}

export default mensajesSockets
