const mongoose = require("mongoose");

const scrambleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  scrambles: {
    type: [],
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const scramblesDB = mongoose.connection.useDb("scrambles");

const scrambleInfo = scramblesDB.model("scramble", scrambleSchema);

module.exports = scrambleInfo;
