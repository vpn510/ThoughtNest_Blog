import { Schema } from "mongoose";
import mongoose from "mongoose";
const blogSchema = new Schema({
   title: {
      type: String,
      require: true
   },
   body: {
      type: String,
      require: true,
   },
   coverImageUrl: {
      type: String,
      require: false,
   },
   createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: true,
   }
}, { timestamps: true });

const blogModel = mongoose.model('blog', blogSchema);
export default blogModel;