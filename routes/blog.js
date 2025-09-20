import { Router } from 'express'
import blogModel from '../models/blog.js';

const router = Router();

router.get('/add-blog', (req, res) => {
   return res.render("addBlog", {
      user: req.user,
   });
})

router.post('/', (req, res) => {
   // const { title, content } = req.body;
   console.log(req.body);
   return res.redirect('/');
})

export default router;