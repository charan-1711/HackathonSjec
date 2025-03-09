import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
});

const subjectSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // Unique subject code
  name: { type: String, required: true }, // Subject name (e.g., Computer Networks)
  year: { type: Number, required: true }, // Year of the subject
  modules: [moduleSchema], // Embedded modules array
  createdAt: { type: Date, default: Date.now },
});

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
