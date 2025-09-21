import commentModel from "../models/comment.js";


const handleAddComment = async (req, res) => {
   const { content } = req.body;
   const { blogId } = req.params;
   const comment = await commentModel.create({
      content,
      blogId,
      createdBy: req.user._id,
   });
   return res.redirect(`/blog/${blogId}`);
}

export { handleAddComment };
