import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.js';
import blogRoute from './routes/blog.js';
import commentRoute from './routes/comment.js';

import blogModel from './models/blog.js';

import { checkAuthenticationCookie } from './middlewares/authentication.js';



dotenv.config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve("./public")))

app.use(cookieParser());
app.use(checkAuthenticationCookie("token"))



app.get('/', async (req, res) => {
   const allBlogs = await blogModel.find();
   res.render('home', { user: req.user, blogs: allBlogs });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use('/comment', commentRoute);


const PORT = process.env.PORT || 8000;


mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database connected"))

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


app.listen(PORT, () => console.log(`Server is running at Port: ${PORT}`));  