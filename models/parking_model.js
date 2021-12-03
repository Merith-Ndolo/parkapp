const mongoose = require("mongoose");

const parking_schema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
    },
    placeNum: {
      type: String,
      validate: /^[A-Za-z0-9_-]*$/im,
      minlength: 1,
      maxlength: 10,
      unique: true,
      trim: true,
      required: true,
    },
    stage: {
      type: String,
      validate: /^[A-Za-z0-9_-]*$/im,
      minlength: 1,
      maxlength: 10,
      trim: true,
      required: true,
    },
    disponibility: {
      type: Boolean,
      required: true,
    },
    parkers: {
      type: [String],
      required: true,
      validate: /^[A-Za-z0-9_-]*$/im,
    },
    startTime: {
      type: Number,
      require: true,
    },
    occupationTime: {
      type: String,
      required: true,
    },
    historique: {
      type: [
        {
          parkerId: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("parking", parking_schema);
