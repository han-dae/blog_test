const moment = require("moment");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name:{
      type: String,
      required : true,
  },
  email:{
      type: String,
      required: true,
      unique: true
  },
  password:{
      type: String,
      required: true,
  },
  role: {
      type: String,
      enum: ["Master","Visitor"],
      default: "Visitor"
  },
  register_date: {
      type: Date,
      default: moment().format("MMMM DD, YYYY")
  },
  comments: [
      {
          post_id:{
              type: mongoose.Schema.Types.ObjectId,
              ref: "post",
          },
          comment_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
        },
      },
  ],
  posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      }
  ]
});

const User = mongoose.model("user", UserSchema);

module.exports = {User};
