class DAO {
   async readData() {
      throw new ErrorCustom(500, "Falta implementar 'readData ")
   }

   async readID() {
      throw new ErrorCustom(500, "Falta implementar 'readID' ")
   }

   async guardarNuevo() {
      throw new ErrorCustom(500, "Falta implementar 'guardarNuevo ")
   }

   async actualizar() {
      throw new ErrorCustom(500, "Falta implementar 'actualizar ")
   }

   async borrar() {
      throw new ErrorCustom(500, "Falta implementar 'borrar ")
   }
}

export default DAO
