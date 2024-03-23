const { Schema, model } = require("../connection");

const schema = new Schema({
  name: { type: String, required: true },
  cover : {type : String},
  players: { type: String },
  location: { type: Number },
  schedule: { type: Number },
  createdAt: Date
});

module.exports = model("tournament", schema);
