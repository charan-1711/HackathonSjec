import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import Subject from "../models/subjectModel.js";
import QuestionSet from "../models/QuestionSetModel.js";
import QuestionPaper from "../models/QuestionPaperModel.js";

const getUserData = asyncHandler(async (req, res) => {
  const userId = await req.userId;
  const currentYear = new Date().getFullYear();

  console.log(userId);

  // 1️⃣ Get User Details
  const user = await User.findById(userId).select("name email role");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 2️⃣ Get Total Subjects for the Current Year
  const totalSubjects = await Subject.countDocuments({ year: currentYear });

  // 3️⃣ Get Total Questions (Separately for 2-marks and 10-marks) - Current Year Only
  const totalQuestions = await QuestionSet.aggregate([
    {
      $lookup: {
        from: "subjects",
        localField: "subject_id",
        foreignField: "_id",
        as: "subject",
      },
    },
    { $unwind: "$subject" },
    { $match: { "subject.year": currentYear } },
    { $unwind: "$question_data" },
    {
      $group: {
        _id: "$question_data.question_mark",
        count: { $sum: 1 },
      },
    },
  ]);

  // Extract counts for each type
  const questionCounts = {
    "2-marks": 0,
    "10-marks": 0,
  };

  totalQuestions.forEach((q) => {
    questionCounts[q._id] = q.count;
  });

  // 4️⃣ Get Total Generated Question Papers for the Current Year
  const totalGeneratedPapers = await QuestionPaper.aggregate([
    {
      $lookup: {
        from: "subjects",
        localField: "subject_id",
        foreignField: "_id",
        as: "subject",
      },
    },
    { $unwind: "$subject" },
    { $match: { "subject.year": currentYear } },
    { $count: "total" },
  ]);

  const generatedPaperCount =
    totalGeneratedPapers.length > 0 ? totalGeneratedPapers[0].total : 0;

  res.status(200).json({
    user,
    dashboardMetrics: {
      totalSubjects,
      totalQuestions: questionCounts,
      totalGeneratedPapers: generatedPaperCount,
    },
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("name email role");

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  res.status(200).json({ users });
});

export { getUserData, getAllUsers };
