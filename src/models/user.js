const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlengt: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlengt: 30,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: [
      /https?:\/\/(w{3})?\.?[0-9a-z]*[\/\.-]*[0-9a-z]*[\/\.-]*[0-9a-z]*[\/\.-]*[0-9a-z]*[\/\.-]*[0-9a-z]*[\/\.-]*/gm,
      "Некорректная ссылка",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Некорректный email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
