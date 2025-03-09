import mongoose from "mongoose";

const QuestionPaperPatternSchema = new mongoose.Schema({
  name: { type: String, required: true },
  short_questions: { type: Number, default: 10 },
  module_questions: { type: Number, default: 2 },
  marks_per_short: { type: Number, default: 2 },
  marks_per_long: { type: Number, default: 10 },
  total_marks: { type: Number, default: 100 },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const QuestionPaperPattern = mongoose.model(
  "QuestionPaperPattern",
  QuestionPaperPatternSchema
);
export default QuestionPaperPattern;
