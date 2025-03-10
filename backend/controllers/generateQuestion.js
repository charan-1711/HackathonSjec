import PDFDocument from "pdfkit";
import fs from "fs";

const generateQuestionPaper = async (req, res) => {
  try {
    const { subjectId, maxMarks, course } = req.body;

    // Fetch subject details from database
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Fetch questions for the subject
    const questionSets = await QuestionSet.find({ subject_id: subjectId });

    // Separate 2-mark and 10-mark questions
    let twoMarkQuestions = [];
    let tenMarkQuestions = [];

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

    // Create PDF
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const filePath = `QuestionPaper_${subject.code}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    // Header
    doc
      .fontSize(16)
      .text("ST JOSEPH ENGINEERING COLLEGE, MANGALURU", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(course, { align: "center" });
    doc.text(`Subject: ${subject.name} (${subject.code})`, { align: "center" });
    doc.text(
      `Duration: ${
        maxMarks === 100 ? "3 Hrs" : "1.5 Hrs"
      }  |  Maximum Marks: ${maxMarks}`,
      { align: "center" }
    );

    // USN Box
    doc.moveDown();
    doc.text("USN: ___________________________", { align: "right" });
    doc.moveDown(2);

    // Instructions
    doc.text("Note:", { underline: true });
    doc.text("1. Answer all questions.");

    // Questions
    doc.moveDown();
    doc.text("PART-A (2 Marks Questions)", { underline: true });
    selectedTwoMarks.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.question_text}`, { continued: false });
    });

    doc.moveDown();
    doc.text("PART-B (10 Marks Questions)", { underline: true });
    selectedTenMarks.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.question_text}`, { continued: false });
    });

    doc.end();
    return res
      .status(200)
      .json({ message: "Question Paper Generated", filePath });
  } catch (error) {
    console.error("Error generating question paper:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { generateQuestionPaper };
