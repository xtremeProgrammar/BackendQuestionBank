const Questions = require("../models/Questions")


module.exports.getQuestions = async function (req, res) {
    try {
        const questions = await Questions.find({});
        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: "No questions found" });
        }
        res.status(200).json({ message: "success", questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching questions from the server" });
    }
};


module.exports.createQuestion = async function (req, res) {
    const { questionText, option1, option2, option3 = "empty", option4 = "empty", correctChoice } = req.body;

    const validChoices = ["option1", "option2", "option3", "option4"];
    if (!validChoices.includes(correctChoice)) {
        return res.status(400).json({ message: "Invalid correctChoice value. Must be one of 'option1', 'option2', 'option3', or 'option4'." });
    }

    const newQuestion = new Questions({ questionText, option1, option2, option3, option4, correctChoice });

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json({
            message: "Question created successfully",
            question: savedQuestion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating the question", error: error.message });
    }
};
