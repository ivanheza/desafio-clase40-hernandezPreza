import passport from "passport"
import {Strategy} from "passport-facebook"
import config from "../config/config.js"
import UsersMongoDAO from "../services/UsersMongoDao.js"

const Users = new UsersMongoDAO()

const FacebookStrategy = Strategy

////CONFIG PASSPORT

passport.use(
   new FacebookStrategy(
      {
         clientID: config.facebook.appID,
         clientSecret: config.facebook.appSecret,
         callbackURL: "http://localhost:9000/auth/facebook/callback",

         profileFields: ["id", "email", "displayName", "photos", "name"],
      },
      async function (accessToken, refreshToken, profile, cb) {
         // console.log("PROFILE: ", profile)
         const idFacebook = profile.id
         const email = profile.emails[0].value
         const name = profile.displayName
         const profilePhoto = profile.photos[0].value
         const source = "facebook"
         const currentUser = await Users.getUserByEmail(email)

         //console.log("Current User", currentUser)

         if (!currentUser) {
            const newUser = await Users.addFacebookUser(
               idFacebook,
               email,
               name,
               profilePhoto,
               source
            )
            return cb(null, newUser)
         }

         return cb(null, currentUser)
      }
   )
)

passport.serializeUser((user, cb) => {
   //console.log(user)
   cb(null, user.id)
})
passport.deserializeUser(async (obj, cb) => {
   const curr_user = await Users.collection.findOne({obj})
   //console.log(curr_user)
   cb(null, curr_user)
})
