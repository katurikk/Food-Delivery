const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/menu-items", menuController.getAllMenuItems);
router.get("/menu-items/:id", menuController.getMenuItem);
router.post("/menu-items", menuController.createMenuItem);
router.put("/menu-items/:id", menuController.updateMenuItem);
router.delete("/menu-items/:id", menuController.deleteMenuItem);

module.exports = router;
