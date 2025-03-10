import QuestionSet from "../models/QuestionSetModel.js";
import Subject from "../models/subjectModel.js";

/**
 * @desc Add or update a Question Set
 * @route POST /api/qpaper/questionSet/add
 * @access Private (Requires Authentication)
 */
const addOrUpdateQuestionSet = async (req, res) => {
  try {
    const { subject_id, year, question_data } = req.body;
    const userId = req.userId; // Extract user ID from authentication middleware

    if (!subject_id || !year || !question_data || question_data.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the subject exists
    const subjectExists = await Subject.findById(subject_id);
    if (!subjectExists) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Check if a Question Set already exists for the same subject and user
    let existingQuestionSet = await QuestionSet.findOne({
      subject_id,
      created_by: userId,
    });

    if (existingQuestionSet) {
      // Append new questions to `question_data`
      existingQuestionSet.question_data.push(...question_data);
      await existingQuestionSet.save();
      return res.status(200).json({
        message: "Questions added successfully",
        questionSet: existingQuestionSet,
      });
    } else {
      // Create a new Question Set
      const newQuestionSet = new QuestionSet({
        subject_id,
        set_name: `Set-${year}`, // Naming dynamically
        created_by: userId,
        question_data,
      });

      await newQuestionSet.save();
      return res.status(201).json({
        message: "Question Set created successfully",
        questionSet: newQuestionSet,
      });
    }
  } catch (error) {
    console.error("Error in addOrUpdateQuestionSet:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Get all Question Sets for a user
 * @route GET /api/qpaper/questionSet
 * @access Private (Requires Authentication)
 */
const getUserQuestionSets = async (req, res) => {
  try {
    const userId = req.userId;

    const questionSets = await QuestionSet.find({}).populate(
      "subject_id",
      "name code"
    );

    return res.status(200).json({ questionSets });
  } catch (error) {
    console.error("Error in getUserQuestionSets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addOrUpdateQuestionSet, getUserQuestionSets };
