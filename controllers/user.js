import User from "../models/user.js";
import bcrypt from 'bcrypt'
import { createTokenForUser } from "../services/authentication.js";

const handleSingup = async (req, res) => {
   const { fullName, email, password } = req.body;
   if (!fullName || !email || !password) {
      return res.status(400).send("All fields are required");
   }
   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ fullName, email, password: hashedPassword });
      return res.status(201).redirect('/');
   } catch (error) {
      return res.status(500).send(error.message);
   }
}

const handleSignin = async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(400).send("All fields are required");
   }
   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).send("User not found");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).render("signin", { message: "Invalid email or password" });
      }
      const token = createTokenForUser(user);
      // console.log(token);
      return res.cookie('token', token).redirect('/');
   } catch (error) {
      return res.status(500).render("signin");
   }
}

function handleLogout(req, res) {
   res.clearCookie('token');
   return res.redirect('/');
}


export { handleSingup, handleSignin, handleLogout };