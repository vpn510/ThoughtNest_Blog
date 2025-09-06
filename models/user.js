import { Schema, model } from 'mongoose'
import { randomBytes, createHmac as crypto } from 'crypto'
import { hasSubscribers } from 'diagnostics_channel';


const userSchema = new Schema({
   fullName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   salt: {
      type: String,
   },
   password: {
      type: String,
      required: true
   },
   profileImageUrl: {
      type: String,
      default: "/images/default.png",
   },
   role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
   },

}, { timestamps: true })

userSchema.pre('save', function (next) {
   const user = this;

   if (!user.isModified("password")) return;

   const salt = randomBytes(16).toString();
   const haashedPassword = crypto("sha256", salt)
      .update(user.password)
      .digest("hex");

   user.salt = salt;
   user.password = haashedPassword;

   next()

});

userSchema.static("matchPassword", async function (email, password) {
   const user = await this.findOne({ email });
   if (!user) throw new Error("User not found");

   const salt = user.salt;
   const haashedPassword = user.password;

   const newHashedPassword = crypto("sha256", salt)
      .update(password)
      .digest("hex");
   if (newHashedPassword !== haashedPassword) throw new Error("Invalid password");

   // return haashedPassword === newHashedPassword;
   return user;

})



const User = model('user', userSchema)
export default User;