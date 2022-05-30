const generarRandom = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1) + min)
}

export const generarNumeros = (cant) => {
   let randomNumbers = []
   for (let i = 1; i <= cant; i++) {
      const randomNumber = generarRandom(1, 1000)
      randomNumbers.push(randomNumber)
   }

   return randomNumbers
}
process.on("message", (cant) => {
   const numeros = generarNumeros(cant)
   const duplicated = numeros.reduce((acc, value) => {
      return {...acc, [value]: (acc[value] || 0) + 1}
   }, {})
   process.send(duplicated)
})

/* if (cant) {
   console.log("process by query")
   forked.on("message", (data) => {
      res.send(data)
   })
   console.log(
      `Servidor express escuchando en el puerto ${config.minimist_PORT} - PID WORKER ${process.pid}`
   )
   forked.send(cant)
} else {
   console.log("processDefault")
   forked.on("message", (data) => {
      res.send(data)
   })
   forked.send(1000000)
} */
