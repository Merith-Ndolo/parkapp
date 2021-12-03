const UserModel = require("../models/user_model");
const ParkingModel = require("../models/parking_model");
const parkingModel = require("../models/parking_model");
const ObjectID = require("mongoose").Types.ObjectId;
require("dotenv").config({ path: "./config/.env" });

//New place
module.exports.createPlace = async (req, res) => {
  if (req.body.role !== "admin")
    return res.status(405).send("User not allawed");

  let disponibility = true;
  console.log("num stage : " + req.body.stage);

  const newPlace = new parkingModel({
    adminId: req.body.userId,
    placeNum: req.body.num,
    stage: req.body.stage,
    disponibility: disponibility,
    occupationTime: req.body.occupTime,
    parkers: [],
    startTime: 0,
    historique: [],
  });

  try {
    const place = await newPlace.save();
    return res.status(201).json(place);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Read places
module.exports.readPlaces = (req, res) => {
  ParkingModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

//Update place info
module.exports.updatePlace = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  if (req.body.role !== "admin")
    return res.status(405).send("User not allawed");

  const updatedRecord = {
    placeNum: req.body.updatePlaceNum,
    occupationTime: req.body.updateTime,
  };

  ParkingModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

// Delete place
module.exports.deletePlace = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  if (req.body.role !== "admin")
    return res.status(405).send("User not allawed");

  ParkingModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

// get place
module.exports.getPlace = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  console.log(req.body.role);

  try {
    await ParkingModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { disponibility: false, startTime: req.body.breackTime },
        $addToSet: { parkers: req.body.userId },
        $push: {
          historique: {
            parkerId: req.body.userId,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// leave place
module.exports.leavePlace = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await ParkingModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { disponibility: true, startTime: 0 },
        $pull: { parkers: req.body.userId },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { stories: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
