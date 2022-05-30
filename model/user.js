import mongoose from "mongoose"
//import bcypt from "bcrypt"

const userSchema = new mongoose.Schema(
   {
      idFacebook: {
         type: String,
         default: null,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      name: {
         type: String,
         default: null,
      },
      profilePhoto: {
         type: String,
         default: null,
      },
   },
   {timestamps: true}
)

/* userSchema.methods.encryptPass = async (password) => {
   //Encriptado de contraseña
   const salt = await bcypt.genSalt(5)

   return await bcypt.hash(password, salt)
}
userSchema.methods.comparePass = async function (password) {
   ///Devuelve un true si esta bien el password
   return await bcypt.compare(password, this.password)
}
 */
//

const UserModel = mongoose.model("Users", userSchema)

export default UserModel
