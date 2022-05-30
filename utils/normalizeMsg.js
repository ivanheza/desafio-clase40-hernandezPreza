import {normalize, schema} from "normalizr"
///---- Se define el aautor utilizando el mail como atributo de id
const schemaAuthor = new schema.Entity("author", {}, {idAttribute: "email"})
///---- se define la estructura del schema basado en el id de cada autor
const schemaMensaje = new schema.Entity(
   "post",
   {author: schemaAuthor},
   {idAttribute: "_id"}
)
///---- se define la estructura tomando los mensajes de cada id poniendolos en un solo array
const schemaMensajes = new schema.Entity(
   "posts",
   {mensajes: [schemaMensaje]},
   {idAttribute: "id"}
)

const normalizeMsgs = (mensajes) => {
   let normalizedData = normalize({id: "mensajes", mensajes: mensajes}, schemaMensajes)
   return normalizedData
}

export default normalizeMsgs
