const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    clientCreate,
    clientShow,
    clientUpdate,
    clientDelete,
    dataCreate
} = require("../controllers/client");

/* POST clients create /clients */
router.post('/', auth,  asyncErrorHandler(clientCreate));

/* GET clients show /clients/:id */
router.get('/:id', asyncErrorHandler(clientShow));

/* PUT clients update /clients/:id */
router.put('/:id', asyncErrorHandler(clientUpdate));

/* DELETE clients delete /clients/:id */
router.delete('/:id', asyncErrorHandler(clientDelete));

/* CREATE data /clients/:id */
router.post('/:id', asyncErrorHandler(dataCreate));

module.exports = router;
