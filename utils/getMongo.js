import mongoose from "mongoose"
import config from "../config/config.js"

const connectDB = async () => {
   try {
      const db = await mongoose.connect(config.mongoDB.cnxStr, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })

      const url = `${db.connection.host}:${db.connection.port}`
      console.log(`Mongo DB conectado en: ${url}`)
   } catch (error) {
      console.log(`error: ${error.message}`)
      process.exit(1)
   }
}

export default connectDB
