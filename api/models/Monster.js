const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const subareaSchema = Schema({
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

const Subarea = mongoose.model("Subarea", subareaSchema);
module.exports = Subarea;