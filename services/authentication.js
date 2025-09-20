import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const secret = process.env.JWT_SECRET;

function createTokenForUser(user) {
   const payload = {
      _id: user._id,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
   }
   const token = JWT.sign(payload, secret);
   return token;
}

function verifyToken(token) {
   const payload = JWT.verify(token, secret);
   return payload;
}

export { createTokenForUser, verifyToken }