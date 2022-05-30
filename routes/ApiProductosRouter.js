import express from "express"
import {
   borrarProducto,
   randomNumbers,
   testProductos,
} from "../controller/controller-productos.js"
const router = express.Router()

router.get("/productos-test", testProductos)

////--------

router.get("/randoms", randomNumbers)

router.delete("/productos/:id", borrarProducto)

export default router
