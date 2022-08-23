const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const monsterSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  subarea: {
    type: ObjectId,
    ref: "subarea"
  },
  public: {
    type: Boolean,
    default: false
  }
});

const Monster = mongoose.model("Monster", monsterSchema);
module.exports = Monster;