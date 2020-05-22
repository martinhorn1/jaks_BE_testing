const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    userRegister,
    userLogin,
    userMe,
    userLogout,
    userLogoutAll
} = require("../controllers/users");

router.get('/', async (req, res, next) => {
    const users = await User.find({});
    res.send(users);
});

/* POST users register /user/register */
router.post('/register', asyncErrorHandler(userRegister));

/* POST users login /user/login */
router.post('/login', asyncErrorHandler(userLogin));

/* GET user info /user/me */
router.get('/me', auth, userMe);

/* POST users logout /user/me/logout */
router.post('/me/logout', auth, asyncErrorHandler(userLogout));

/* POST users logout all /user/me/logoutall */
router.post('/me/logoutall', auth, asyncErrorHandler(userLogoutAll));

module.exports = router;
