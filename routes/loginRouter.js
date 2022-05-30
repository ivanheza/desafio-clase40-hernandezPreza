import express from "express"
import passport from "passport"
import {
   getUser,
   loginError,
   rootPoint,
   userLogin,
   userLogOut,
} from "../controller/controller-users.js"
import isAuthenticated from "../utils/middleWareAuth.js"

const router = express.Router()

router.get("/", rootPoint)
///////////---- Home Solo hay acceso cuando se hace login

router.get("/home", isAuthenticated, getUser)

////---Login
router.get("/login", userLogin)

///////////---- Sign In With Facebook

router.post("/auth/facebook", passport.authenticate("facebook"))

router.get(
   "/auth/facebook/callback",
   passport.authenticate("facebook", {
      failureRedirect: "/login/Error",
      successRedirect: "/",
      scope: ["email"],
   })
)

router.get("/login/error", loginError)
///////////---- Logout!

router.get("/logout", isAuthenticated, userLogOut)

export default router
