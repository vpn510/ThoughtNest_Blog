import { Router } from 'express'
import User from '../models/user.js'
import { handleSingup, handleSignin, handleLogout } from '../controllers/user.js';

const router = Router();


router.get('/signin', (req, res) => {
   res.render('signin');
})

router.get('/signup', (req, res) => {
   res.render('signup');
})

router.post('/signup', handleSingup);

router.post('/signin', handleSignin);

router.get('/logout', handleLogout);

export default router;