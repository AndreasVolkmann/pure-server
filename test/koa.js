'use strict';

const Expect = require('chai').expect;
const http = require('http');
const app = require('../koa');
const mongoose = require('mongoose');
const url = require('../config/Connections').local.url();

const TESTPORT = 3456;


let server;


before(function (done) {
    server = http.createServer(app);
    server.listen(TESTPORT, function () {
        mongoose.connect(url, function (err) {
            Expect(err).to.be.false;
            done();
        });
    });
});

describe();