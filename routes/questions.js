const express = require('express');
const { create, getQuestion, deleteQuestion } = require('../controllers/questions');
const Router = express.Router();

Router.post('/create', create);
Router.get("/view/:_id", getQuestion);
Router.delete("/delete/:_id", deleteQuestion);
Router.use("/options", require("./options"));

module.exports = Router;