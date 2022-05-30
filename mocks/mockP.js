import {faker} from "@faker-js/faker"
import {customAlphabet} from "nanoid"
import productoDTO from "../DTO/productoDTO.js"

const prodID = customAlphabet("1234567890abcdef", 4)
faker.setLocale("es")
const generarProducto = () => {
   const newMock = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.business(),
   }

   return productoDTO(newMock)
}
const generarProductos = (cant) => {
   const nuevos = []

   for (let i = 1; i <= cant; i++) {
      const product = generarProducto()
      nuevos.push(product)
   }

   return nuevos
}

export {generarProducto, generarProductos}
