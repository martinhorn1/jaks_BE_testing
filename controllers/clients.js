const Client = require("../models/client");

module.exports = {
    // Clients Index Page
    async clientIndex(req, res, next) {
        const user = req.user._id;
        const { _id } = user;
        let clients = await Client.find({lawyerid: _id}, {lawyerid: 0});
        res.send(clients);
    },
};
