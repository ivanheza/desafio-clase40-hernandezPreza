import logger from "../helpers/winston.js"
let registro
export const rootPoint = (req, res) => {
   const {url, method} = req
   logger.info(`Metodo: ${method} - Ruta: ${url}`)
   ///---- nos redirige a la pagina home, en caso de no tener autorización nos lleva a login
   res.redirect("/home")
}
///----Se accede a los datos de usuario
export const getUser = (req, res) => {
   const {url, method} = req
   logger.info(`Metodo: ${method} - Ruta: ${url}`)
   ///---- se pasa el valor de la variable user para hacer uso de la informacion del usuario
   registro = true

   //console.log(image)
   let user = {
      name: req.user.name,
      email: req.user.email,
      profilePhoto: req.user.profilePhoto,
   }

   if (req.user) {
      res.render("index", {user})
   }
}
///----
export const userLogin = (req, res) => {
   const {url, method} = req
   logger.info(`Metodo: ${method} - Ruta: ${url}`)
   //console.log(req.session)

   ///---- Login: se verifica si el usuario esta utenticado y se redirecciona al home
   registro = false

   if (req.isAuthenticated()) {
      res.redirect("/")
   }
   res.render("face-login", {registro})
}
///----
export const loginError = (req, res) => {
   const {url, method} = req
   logger.info(`Metodo: ${method} - Ruta: ${url}`)
   let scripts = [{script: "/setTimeout.js"}]
   res.render("log-error", {scripts})
}
///---
export const userLogOut = (req, res) => {
   const {url, method} = req
   logger.info(`Metodo: ${method} - Ruta: ${url}`)
   ///------- Se definió una variable scripts para cargar el script set timeout y redirigir la pagina, se envia a la hora de hacer render del hbs
   let scripts = [{script: "/setTimeout.js"}]
   ///---- se utiliza el req. session para terminar la sesion.

   res.render("logout", {user: req.session.user, scripts})
   res.clearCookie("connect.sid")
   req.session.destroy((err) => {
      if (err) {
         console.log(err)
      }
   })
}
