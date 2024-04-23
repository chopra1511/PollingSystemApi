const Option = require("../models/options");
const Question = require("../models/questions");

module.exports.create = async (req, res) => {
    console.log(req.body);
    console.log(req.params._id);
    let option = new Option({
        option: req.body.content,
        question: req.params._id
    });
    await option.save();
    const updateOption = await Option.findByIdAndUpdate(option._id, {
        add_vote: `http://localhost:3030/options/${option._id}/add_vote`,
    });
    updateOption.save();
    const question = await Question.findById(req.params._id);
    if (question) {
        question.options.push(updateOption);
        question.save().then((result) => {
            console.log(question);
            res.send(question)
        }).catch((err) => {
            res.send("Question does not exist!")
        });
    }
}

module.exports.add_vote = async (req, res) => {
    
    const option = await Option.findByIdAndUpdate(req.params._id, { $inc: { vote: 1 } });
    if (option) {
      await option.save();
      console.log(option);
      res.send(option);
    }
    // handling the bad requests
    else {
      res.send("option does not exits");
    }
}

module.exports.deleteOption = async (req, res) => {
    
    let option = await Option.findById(req.params._id);
    let vote = option.vote
    console.log(vote);
    if (vote > 0) {
         res.send(
           "Option can’t be deleted because it has votes"
         );
    }else if (option) {
        let questionId = option.question;
        await Question.findByIdAndUpdate(questionId, { $pull: { options: req.params._id } });
        await Option.findByIdAndDelete(req.params._id);
        res.send('Option Deleted!')
    } else {
        res.send('ID does not exist!')
    }
}