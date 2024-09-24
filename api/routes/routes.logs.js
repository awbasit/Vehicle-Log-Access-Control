const express = require('express')
const pool = require("../database/db")
const router = express.Router()

const LogsController = require('../controllers/logs.controller')
const logsController = new LogsController(pool);

// router.get('/', logsController.getLogs.bind(logsController))

// router.post("/", logsController.getJson.bind(logsController));
router.get("/", logsController.getLogs.bind(logsController))

module.exports = router;