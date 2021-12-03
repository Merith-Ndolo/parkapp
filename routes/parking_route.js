const router = require("express").Router();
const parkingController = require("../controllers/parking_controller");

router.post("/", parkingController.createPlace);
router.get("/", parkingController.readPlaces);
router.delete("/:id", parkingController.deletePlace);
router.put("/:id", parkingController.updatePlace);
router.patch("/garer/:id", parkingController.getPlace);
router.patch("/leave/:id", parkingController.leavePlace);

module.exports = router;
