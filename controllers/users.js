const User = require('../models/user');

module.exports = {
    // Create a new user
    async userRegister(req, res, next) {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).send({ user })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    // Login a registered user and generate token
    async userLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }
            const token = await user.generateAuthToken();
            res.send({ token })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    // View logged in user profile
    userMe(req, res, next) {
        res.send(req.user);
    },
    // Log user out of the application
    async userLogout(req, res, next) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    },
    // Log user out of all devices
    async userLogoutAll(req, res, next) {
        try {
            req.user.tokens.splice(0, req.user.tokens.length)
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }
}
