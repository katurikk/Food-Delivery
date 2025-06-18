const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.get("/restaurants", restaurantController.getAllRestaurants);
router.get("/restaurants/:id", restaurantController.getRestaurantById);
router.post("/restaurants", restaurantController.createRestaurant);
router.put("/restaurants/:id", restaurantController.updateRestaurant);

router.delete("/restaurants/:id", restaurantController.deleteRestaurant);

module.exports = router;