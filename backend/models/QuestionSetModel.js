import mongoose from "mongoose";

const QuestionSetSchema = new mongoose.Schema({
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  set_name: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  question_data: [
    {
      question_text: { type: String, required: true },
      question_mark: {
        type: String,
        enum: ["2-marks", "10-marks"],
        required: true,
      },
      BL: { type: String, required: true }, // Bloom's Taxonomy Level
      TLO: { type: String, required: true }, // Topic Learning Outcome
      CO: { type: String, required: true }, // Course Outcome
      PO: { type: String, required: true }, // Program Outcome
      moduleNo: { type: Number, required: true }, // Module Number
    },
  ],
});

QuestionSetSchema.index(
  { subject_id: 1, created_by: 1, set_name: 1 },
  { unique: true }
);

const QuestionSet = mongoose.model("QuestionSet", QuestionSetSchema);
export default QuestionSet;
