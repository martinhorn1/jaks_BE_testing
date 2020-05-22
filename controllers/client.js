const Client = require("../models/client");
const User = require("../models/user");
const Data = require("../models/data");
const mongoose = require("mongoose");

module.exports = {
    // Clients Create
    async clientCreate(req, res, next) {
        try {
            const user = req.user._id;
            const { _id } = user;
            let client = new Client(req.body);
            client.set({ lawyerid: _id });
            let lawyer = await User.findByIdAndUpdate({ _id }, { $push: { clients: client } });
            await client.save();
            lawyer.save();
            res.status(201).send({client});
        } catch (error) {
            res.status(400).send(error)
        }
    },
    // Clients Show Page
    async clientShow(req, res, next) {
        let client = await Client.findById(req.params.id);
        res.send(client);
    },
    // Clients Update
    async clientUpdate(req, res, next) {
        let client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await client.save();
        res.send(client);
    },
    // Clients Delete
    async clientDelete(req, res, next) {
        let client = await Client.findByIdAndRemove(req.params.id);
        res.send("Deleted client");
    },
    // Clients Create Data
    async dataCreate(req, res, next) {
        let client = await Client.findById(req.params.id);
        let data = await new Data(req.body);
        client.data.push(data);
        client.save();
        res.send(client);
    },
};
