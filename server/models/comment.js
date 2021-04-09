const mongoose = require("mongoose");
const moment = require("moment");

const CommentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format("MMMM DD, YYYY"),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  creatorName: { type: String },
// 작성자 이름을 찾을때 참조를 사용하다보면 시간이 조금 걸려서 그냥 스키마에 작성
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = { Comment };