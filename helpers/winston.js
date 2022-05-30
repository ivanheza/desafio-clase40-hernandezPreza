import winston from "winston"

function buildProdLogger() {
   const prodLogger = winston.createLogger({
      transports: [
         new winston.transports.File({filename: "warn.log", level: "warn"}),
         new winston.transports.File({filename: "error.log", level: "error"}),
         new winston.transports.Console({level: "verbose"}),
      ],
      format: winston.format.combine(winston.format.colorize(), winston.format.json()),
   })
   return prodLogger
}

function buildDevLogger() {
   const devLogger = winston.createLogger({
      transports: [new winston.transports.Console({level: "info"})],
   })
   return devLogger
}

let logger = null
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "PROD") {
   logger = buildProdLogger()
} else {
   logger = buildDevLogger()
}

export default logger
