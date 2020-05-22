const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    clientIndex,
} = require("../controllers/clients");

/* GET clients index /clients */
router.get('/', auth,  asyncErrorHandler(clientIndex));

module.exports = router;
