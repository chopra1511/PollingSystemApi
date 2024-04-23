const Question = require("../models/questions");
const Option = require("../models/options");


module.exports.create = async (req, res) => {
    console.log(req.url);
    console.log(req.body);

    let question = new Question({
        title: req.body.title,
    });

    await question.save().then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.getQuestion = async (req, res) => {
    console.log(req.params._id);
    let question = await Question.findOne({ _id: req.params._id }).populate('options');
    if (question) {
        res.send(question);
    } else {
         res.send("ID does not exits");
    }
}

module.exports.deleteQuestion = async (req, res) => {
  console.log(req.params._id);
  let question = await Question.findOne({ _id: req.params._id }).populate(
    "options"
  );
  let result = question.options.map((vote) => vote.vote);
  if (Math.max(...result) > 0) {
      res.send(
        "Question can’t be deleted because one of it's options has votes"
      );
  } else {
     await Question.findByIdAndDelete({ _id: req.params._id })
       .then(() => {
         res.send("Deleted the question");
       })
       .catch((err) => {
         res.send(err);
       });

      await Option.deleteMany({ question: question._id}).then((result) => {
          console.log(result);
      }).catch((err) => {
          res.send(err)
      });
  }
}