import { verifyToken } from "../services/authentication.js";
function checkAuthenticationCookie(cookieName) {
   return (req, res, next) => {
      const cookieValue = req.cookies[cookieName];
      // console.log(cookieValue);
      if (!cookieValue) {
         return next();
      }
      try {
         // console.log("lol");
         const userPayload = verifyToken(cookieValue);
         req.user = userPayload;
      } catch (error) { }
      return next();
   }
}


export { checkAuthenticationCookie }