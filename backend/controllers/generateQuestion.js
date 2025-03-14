import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Fix for __dirname
import Subject from "../models/subjectModel.js";
import QuestionSet from "../models/QuestionSetModel.js";
import QuestionPaper from "../models/QuestionPaperModel.js"; // Import QuestionPaper model

// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateQuestionPaper = async (req, res) => {
  try {
    const { subjectId, maxMarks } = req.body;
    const course = "Master of Computer Application";
    const exportFormat = "PDF";
    const userId = req.userId;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const existingPaper = await QuestionPaper.findOne({
      subject_id: subjectId,
      total_marks: maxMarks,
    });
    if (existingPaper) {
      const existingFilePath = path.join(
        __dirname,
        "../questionPapers",
        `QuestionPaper_${subject.code}_${maxMarks}.pdf`
      );
      if (fs.existsSync(existingFilePath)) {
        return res.download(existingFilePath);
      }
    }

    // Fetch questions for the subject
    const questionSets = await QuestionSet.find({ subject_id: subjectId });

    let twoMarkQuestions = [],
      tenMarkQuestions = [];
    questionSets.forEach((set) => {
      set.question_data.forEach((q) => {
        if (q.question_mark === "2-marks") twoMarkQuestions.push(q);
        if (q.question_mark === "10-marks") tenMarkQuestions.push(q);
      });
    });

    // Select questions based on max marks
    const selectedTwoMarks = twoMarkQuestions.slice(
      0,
      maxMarks === 100 ? 10 : 5
    );
    const selectedTenMarks = tenMarkQuestions.slice(
      0,
      maxMarks === 100 ? 8 : 4
    );

    // **Organizing 10-mark questions by module**
    const requiredModules = maxMarks === 100 ? [1, 2, 3, 4] : [1, 2];
    let moduleQuestions = requiredModules.map((moduleNo, index) => ({
      moduleNo,
      questions: selectedTenMarks.slice(index * 2, index * 2 + 2),
    }));

    const questionPapersDir = path.join(__dirname, "../questionPapers");
    if (!fs.existsSync(questionPapersDir)) {
      fs.mkdirSync(questionPapersDir, { recursive: true });
    }

    const filePath = path.join(
      questionPapersDir,
      `QuestionPaper_${subject.code}_${maxMarks}.pdf`
    );
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc
      .fontSize(16)
      .text("ST JOSEPH ENGINEERING COLLEGE, MANGALURU", { align: "center" });
    doc.fontSize(12).text(course, { align: "center" });
    doc.text(`Subject: ${subject.name} (${subject.code})`, { align: "center" });
    doc.text(
      `Duration: ${
        maxMarks === 100 ? "3 Hrs" : "1.5 Hrs"
      }  |  Maximum Marks: ${maxMarks}`,
      { align: "center" }
    );

    doc.moveDown();
    doc.text("USN: ___________________________", { align: "right" });
    doc.moveDown(2);

    doc.text("Note:", { underline: true });
    doc.text("1. Answer all questions.");
    doc.moveDown();

    doc.text("PART-A (2 Marks Questions)", { underline: true, bold: true });
    selectedTwoMarks.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.question_text}`);
    });

    doc.moveDown();
    doc.text("PART-B (10 Marks Questions)", { underline: true, bold: true });
    moduleQuestions.forEach((mod, index) => {
      doc.text(`Module ${mod.moduleNo}:`);
      mod.questions.forEach((q, qIndex) => {
        doc.text(`${index * 2 + qIndex + 1}. ${q.question_text}`);
      });
      doc.moveDown();
    });

    doc.end();

    // **Insert question paper into database**
    const newQuestionPaper = new QuestionPaper({
      subject_id: subjectId,
      generated_by: userId,
      short_questions_json: selectedTwoMarks,
      module_questions_json: moduleQuestions,
      total_marks: maxMarks,
      export_format: exportFormat,
    });

    await newQuestionPaper.save();
    writeStream.on("finish", () => res.download(filePath));
  } catch (error) {
    console.error("Error generating question paper:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllQuestionPapers = async (req, res) => {
  try {
    const questionPapers = await QuestionPaper.find().populate(
      "subject_id",
      "name code"
    );

    const response = questionPapers.map((qp) => {
      // Extract short questions count
      const totalShortQuestions = qp.short_questions_json.length;

      // Extract module questions count, handling empty arrays correctly
      const totalModuleQuestions = qp.module_questions_json.reduce(
        (acc, mod) => acc + mod.questions.length,
        0
      );

      return {
        id: qp._id,
        subject_id: qp.subject_id._id,
        subject_name: qp.subject_id.name,
        subject_code: qp.subject_id.code,
        total_marks: qp.total_marks,
        number_of_questions: totalShortQuestions + totalModuleQuestions, // Corrected count
        short_questions: qp.short_questions_json,
        module_questions: qp.module_questions_json,
      };
    });

    console.log("Formatted Question Papers:", response); // Debugging
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching question papers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { generateQuestionPaper, getAllQuestionPapers };
