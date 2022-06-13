import {buildSchema} from "graphql"
import {
   deleteProduct,
   editProduct,
   getProduct,
   getProducts,
   newProduct,
} from "./graphql-controller.js"

export const schemaP = buildSchema(`
  input ProductInput {
    name: String,
    price: Int,
    image: String
  },
  type Producto {
    _id: ID,
    name: String,
    price: Int,
    image: String
  },
  type Query {
    getProduct(_id: ID!):Producto,
    getProducts: [Producto],
  },
  type Mutation {
   newProduct(input: ProductInput): Producto,
   editProduct(_id: ID!, data: ProductInput): Producto,
   deleteProduct(_id: ID!): Producto,
  }
`)

export const root = {
   getProducts: getProducts,
   getProduct: getProduct,
   newProduct: newProduct,
   editProduct: editProduct,
   deleteProduct: deleteProduct,
}
