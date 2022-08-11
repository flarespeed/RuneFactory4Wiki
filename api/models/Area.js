const mongoose = require("mongoose");

const { Schema } = mongoose;

const areaSchema = Schema(
  {
    name: {
      type: String,
      required: true,
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

areaSchema.virtual("subareas", {
  ref: "Subarea",
  localField: "_id",
  foreignField: "area",
  justOne: false,
});

const Area = mongoose.model("Area", areaSchema);
module.exports = Area;