const mongoose = require('mongoose');
const Client = require('../models/client');
const clientData = {"name": "Test", "phone": "Test", "email": "Test@user.ee", "address": "Yes", "idCode": "1"}
const clientDataValid = {"name": "Test", "phone": "55995599", "email": "Test@user.ee", "address": "Yes", "idCode": "1"}

before((done) => {
    mongoose.connect("mongodb://localhost:27017/testDatabase", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
        done();
    });
});

it('should return an error when phone is not a number', (done) => {
    var newClient = new Client(clientData);
    newClient.save(err => {
        if (isNaN(newClient.phone)) {
            throw new Error("Phone must be a number");
        }
        done();
    });
});

it('should pass when phone is a number', (done) => {
    var newClient = new Client(clientDataValid);
    newClient.save(err => {
        if (isNaN(newClient.phone)) {
            throw new Error("Phone must be a number");
        }
        done();
    });
});

//After all tests are finished drop database and close connection
after((done) => {
    mongoose.connection.db.dropDatabase(function () {
        mongoose.connection.close(done);
    });
    
    // mongoose.connection.close(done);
});