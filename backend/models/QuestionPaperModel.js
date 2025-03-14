import mongoose from "mongoose";

const QuestionPaperSchema = new mongoose.Schema({
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  pattern_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionPaperPattern",
  },
  generated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  short_questions_json: [
    {
      question_text: { type: String, required: true },
      BL: { type: String, required: true },
      TLO: { type: String, required: true },
      CO: { type: String, required: true },
      PO: { type: String, required: true },
      moduleNo: { type: Number, required: true },
    },
  ],

  module_questions_json: [
    {
      moduleNo: { type: Number, required: true },
      questions: [
        {
          question_text: { type: String, required: true },
          BL: { type: String, required: true },
          TLO: { type: String, required: true },
          CO: { type: String, required: true },
          PO: { type: String, required: true },
        },
      ],
    },
  ],

  total_marks: { type: Number, default: 100 },
  export_format: { type: String, enum: ["PDF", "Word"], required: true },
  created_at: { type: Date, default: Date.now },
});

const QuestionPaper = mongoose.model("QuestionPaper", QuestionPaperSchema);
export default QuestionPaper;
