const mongoose = require("mongoose");

const QuestionformModel = mongoose.Schema(
  {
    name:{ 
      type:String,
      required:true
  },
  question:{
      type:String,
      required:true,
  },
  email:{
      type: String,
      required: true,
  },
  timestamp:{
    type:String,
    default:Date.now()
}
  }
);

const Question= mongoose.model("Question", QuestionformModel);

module.exports = Question;