const express = require("express");
const pool = require("../database/db");
const router = express.Router();

// Import the ownerController instance
// const ownerController = require('../controllers/owners.controller');
const OwnerController = require("../controllers/users.controller");
const ownerController = new OwnerController(pool);
// Define routes using the ownerController instance
router.get("/", ownerController.getAll.bind(ownerController));
router.get("/:id", ownerController.getOne.bind(ownerController));
router.post("/", ownerController.create.bind(ownerController));
router.post("/logs", ownerController.getJson.bind(ownerController));
router.get("/logs", ownerController.getLogs.bind(ownerController));
router.put("/:id", ownerController.update.bind(ownerController));
router.delete("/:id", ownerController.delete.bind(ownerController));

module.exports = router;
