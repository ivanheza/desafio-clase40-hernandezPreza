import mongoose from "mongoose"
const Schema = mongoose.Schema

const productoSchema = new Schema(
   {
      name: {type: String},
      price: {type: Number},
      image: {type: String},
   },
   {timestamps: true}
)

const ProductoModel = mongoose.model("Productos", productoSchema)
export default ProductoModel
