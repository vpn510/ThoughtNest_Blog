import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { handleAddBlog, handleAddBlogPage } from '../controllers/blog.js';
import commentModel from '../models/comment.js';

import blogModel from '../models/blog.js';


const router = Router();

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
   },
   filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
   }
});
const upload = multer({ storage: storage })

router.get('/add-blog', handleAddBlogPage)

router.post('/', upload.single('coverImage'), handleAddBlog);

router.get('/:id', async (req, res) => {
   const blog = await blogModel.findById(req.params.id).populate('createdBy');
   const comments = await commentModel.find({ blogId: req.params.id }).populate('createdBy');
   return res.render('blog', {
      user: req.user,
      blog,
      comments,
   });
});


export default router;
