import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.js';
import blogRoute from './routes/blog.js';

import { checkAuthenticationCookie } from './middlewares/authentication.js';



dotenv.config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"))


app.get('/', (req, res) => {
   res.render('home', { user: req.user });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);


const PORT = 8000

mongoose.connect("mongodb://127.0.0.1:27017/ThoughtNest_Blog").then(() => console.log("Database connected"))

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


app.listen(PORT, () => console.log(`Server is running at Port: ${PORT}`));