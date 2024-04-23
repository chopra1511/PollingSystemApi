const express = require("express");
const { create, add_vote, deleteOption } = require("../controllers/options");
const Router = express.Router();

Router.post('/:_id/create', create);
Router.get("/:_id/add_vote", add_vote);
Router.delete("/delete/:_id", deleteOption);


module.exports = Router;
