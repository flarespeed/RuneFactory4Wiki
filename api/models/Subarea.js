const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const subareaSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    area: {
      type: ObjectId,
      ref: "area"
    },
    north: {
      type: ObjectId,
      ref: "north"
    },
    east: {
      type: ObjectId,
      ref: "east"
    },
    south: {
      type: ObjectId,
      ref: "south"
    },
    west: {
      type: ObjectId,
      ref: "west"
    },
    public: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

subareaSchema.virtual("monsters", {
  ref: "Monster",
  localField: "_id",
  foreignField: "subarea",
  justOne: false,
});

const Subarea = mongoose.model("Subarea", subareaSchema);
module.exports = Subarea;