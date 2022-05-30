import dotenv from "dotenv"
import minimist from "minimist"

dotenv.config()
///minimist
// node server.js --port 8080
let p = minimist(process.argv.slice(2))
console.log()

///---- ///---- Se configurará desde aqui el acceso a base de datos
export default {
   mongoDB: {
      client: "mongodb",
      cnxStr: process.env.MONGO_UR,
   },

   fileSystem: {
      path: "./db",
   },
   facebook: {
      appID: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET,
   },
   minimist_PORT: p.port,
   CLUSTER: p.CLUSTER && "CLUSTER",
   FORK: p.FORK && "FORK",
   persistencia: p.MONGO ? "MONGO" : p.FS ? "FS" : "MONGO",
}
