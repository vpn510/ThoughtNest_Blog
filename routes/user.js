import { Router } from 'express'
import User from '../models/user.js'

const router = Router();


router.get('/signin', (req, res) => {
   res.render('signin');
})

router.get('/signup', (req, res) => {
   res.render('signup');
})

router.post('/signup', async (req, res) => {
   const { fullName, email, password } = req.body;
   await User.create({ fullName, email, password })

   return res.status(201).redirect('/');

})

router.post('/signin', async (req, res) => {
   const { email, password } = req.body;
   User.matchPassword(email, password);
   const user = await User.matchPassword(email, password);
   console.log("user", user);
   return res.status(201).redirect("/");

})

export default router;