import express from "express"
import {infoZip, processInfo} from "../controller/controller-process.js"
import compression from "compression"

const router = express.Router()

router.get("/", processInfo)
////---- Ruta con el middleware Compression()

router.get("/zip", compression(), infoZip)

export default router
