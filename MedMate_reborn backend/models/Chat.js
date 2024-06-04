const mongoose = require ('mongoose');
 // todo model

 const commentSchema = new mongoose.Schema({
   number: {
      type: Number,
      required: true,
      unique: true
   },
    creator: {
       type: String,
       required: true
    },
   time: {
      type: month, date, hour, minute
   }
});

commentSchema.pre('save', async function(next) {
   try {
     if (!this.number) {
       const maxNumberComment = await Comment.findOne({}, {}, { sort: { 'number': -1 } });
       this.number = maxNumberComment ? maxNumberComment.number + 1 : 1;
     }
     next();
   } catch (error) {
     next(error);
   }
 });

const Comment = mongoose.model('Comment', commentSchema);
module.export = Comment;