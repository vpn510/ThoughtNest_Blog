import blogModel from "../models/blog.js";

const handleAddBlog =  async (req, res) => {
   // console.log(req.body, req.file);
   const { title, body } = req.body;
   const blog = await blogModel.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageUrl: `/uploads/${req.file.filename}`,
   })
   return res.redirect(`/blog/${blog._id}`);
}

const handleAddBlogPage = async  (req, res) => {
   return res.render("addBlog", {
      user: req.user,
   });
}

export { handleAddBlog, handleAddBlogPage };