import {cpus} from "os"
import config from "../config/config.js"
import logger from "../helpers/winston.js"
const numCPUs = cpus().length
let PUERTO = config.minimist_PORT || process.env.PORT || 8080

export const processInfo = (req, res) => {
   const {url, method} = req
   console.log()
   logger.info(`Metodo: ${method} - Ruta: ${url}`)

   let user = {
      name: "Admin",
      profilePhoto: "https://cdn1.iconfinder.com/data/icons/web-55/32/web_3-512.png",
   }
   let p = {
      argumentos: process.argv,
      OS: process.platform,
      nodeVer: process.version,
      memoria: process.memoryUsage(),
      path: process.execPath,
      pID: process.pid,
      folder: process.cwd(),
      numCPUs: numCPUs,
      PORT: PUERTO,
   }

   res.render("process-info", {p, user})
}
////-----

export const infoZip = (req, res) => {
   const {url, method} = req
   logger.info(`Metodo: ${method} - Ruta: ${url}`)

   let user = {
      name: "Admin",
      profilePhoto: "https://cdn1.iconfinder.com/data/icons/web-55/32/web_3-512.png",
   }
   let p = {
      argumentos: process.argv,
      OS: process.platform,
      nodeVer: process.version,
      memoria: process.memoryUsage(),
      path: process.execPath,
      pID: process.pid,
      folder: process.cwd(),
      numCPUs: numCPUs,
      PORT: PUERTO,
   }

   res.render("process-info", {p, user})
}
