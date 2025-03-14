import { asyncHandler } from "../middlewares/asyncHandler.js";
import Subject from "../models/subjectModel.js";

// ✅ Insert a new subject
const addSubject = asyncHandler(async (req, res) => {
  const { code, name, year, modules } = req.body;

  // ✅ Check if subject already exists for the same year
  const existingSubject = await Subject.findOne({ code, year });
  if (existingSubject) {
    return res
      .status(400)
      .json({ message: "Subject already exists for this year" });
  }

  // ✅ Create a new subject
  const subject = new Subject({ code, name, year, modules });
  await subject.save();

  res.status(201).json({ message: "Subject added successfully", subject });
});

// ✅ Delete a subject by ID
const deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findById(id);
  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  await subject.deleteOne();
  res.status(200).json({ message: "Subject deleted successfully" });
});

const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({}, "code name year modules");

  if (!subjects.length) {
    return res.status(404).json({ message: "No subjects found" });
  }

  res.status(200).json({ subjects });
});

export { addSubject, deleteSubject, getAllSubjects };
