# DESAFÍO MEJORANDO ARQUITECTURA DE NUESTRA API

-  Acceder al proyecto en la dirección **http://localhost:9000**

\*\*Para este desafío se modificó la persistencia de los datos integrando los conceptos DAO,DTO y FACTORY con las tecnologías de FileSystem y MONGODB.

## Consignas

-  Se definió una misma lógica para la persistencia en el factory para los productos y mensajes.
-  El DAO se selecciona según la persistencia que se necesite, por default es MONGO.
   _MongoDB:_ node server.js --MONGO
   _FileSystem:_ node server.js --FS

### Loggueo

-  Se implementó el uso de Winston para el manejo de logs en los niveles, info, warn y error.

*  info: se muestra por consola
*  warn: en el archivo warn.log
*  error: en el archivo error.log "Solo errores del manejo de WebSockets"

### Main Dependencies

-  Para el servidor, manejo de rutas [Express JS](https://expressjs.com/es/ "Ver más")
-  Para el manejo de sessions en mongo [connect-Mongo](https://www.npmjs.com/package/connect-mongo "Ver más")
-  Para manejo de session en la app [Express Session](https://www.npmjs.com/package/express-session "Ver más")
-  Para el render del frontend [Express Handlebars](https://www.npmjs.com/package/express-handlebars "Ver más")
-  Middleware de autenticación para Node [passport](https://www.npmjs.com/package/passport "Ver más")
-  Para el manejo de autenticación de Facebook [passport-facebook](https://www.npmjs.com/package/passport-facebook "Ver más")
-  Para la implementación de mysql [mysql](https://momentjs.com/ "Ver más")
-  Para la normalización de objetos anidados en la instancia de mensajes [normalizr](https://www.npmjs.com/package/normalizr "Ver más")
-  Para la configuracion del servidor y la comunicación entre el backend y frontend [socket io](https://socket.io/ "Ver más")

-  Se utilizó la dependencia de dotenv para la implementacion y uso de variables de entorno .env [dotenv](https://www.npmjs.com/package/dotenv "Ver más")
-  Herramienta para trabajar con MongoDB [mongoose](https://www.npmjs.com/package/mongoose "Ver más")

#### Created by: **Ivan Hernández Preza**

-
