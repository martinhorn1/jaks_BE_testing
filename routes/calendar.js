const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    calendarCreate,
    calendarShow,
    calendarUpdate,
    calendarDelete,
    calendarShowId,
} = require("../controllers/calendar");

/* POST calendar */
router.post('/', auth,  asyncErrorHandler(calendarCreate));

/* GET calendar */
router.get('/', asyncErrorHandler(calendarShow));

/* GET by ID calendar */
router.get('/:calid', asyncErrorHandler(calendarShowId));

/* PUT clients update /clients/:id */
router.put('/:id', asyncErrorHandler(calendarUpdate));

/* DELETE clients delete /clients/:id */
router.delete('/:calid', asyncErrorHandler(calendarDelete));



module.exports = router;
