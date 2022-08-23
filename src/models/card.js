const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: [
      /https?:\/\/(w{3})?\.?[0-9a-z]*[\/\.-]*[0-9a-z]*[\/\.-]*[0-9a-z]*[\/\.-]*[0-9a-z]*[\/\.-]*[0-9a-z]*[\/\.-]*/gm,
      "Некорректная ссылка",
    ],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    dafault: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
