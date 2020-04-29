const express = require("express");
const router = express.Router();
const Scramble = require("../models/scramble");

// Getting all
router.get("/", async (req, res) => {
  try {
    const scrambles = await Scramble.find();
    res.json(scrambles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting one by Id
router.get("/id", async (req, res) => {
  try {
    const scramble = await Scramble.find({ owner: req.query.id });
    res.status(200).json(scramble);
    if (scramble == null) {
      return res.status(404).json({ message: "Cannot find scramble" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post("/", async function (req, res) {
  const scrambleToSave = new Scramble({
    name: req.body.name,
    scrambles: req.body.questions,
  });
  console.log(scrambleToSave);
  try {
    const newScramble = await scrambleToSave.save();
    res.status(201).json(newScramble);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

//delete by test ID
router.post("/deletebyid", async (req, res) => {
  try {
    const deleted = await Scramble.findByIdAndDelete(req.body.id);
    console.log(deleted);
    res.json({ message: "Deleted Scramble", deleted: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
