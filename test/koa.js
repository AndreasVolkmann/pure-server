'use strict';

const Expect = require('chai').expect;
const http = require('http');
const app = require('../koa');
const mongoose = require('mongoose');
const url = require('../config/Connections').local.url();
const request = require('request');

const TESTPORT = 3456;
const baseurl = `http://localhost${TESTPORT}/`;


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

after(async done =>{
    await server.close();
    done();
});

describe('Koa server test', function () {
    const options = {
        url: baseurl + '/users',
        method: 'GET',
        json: true
    };
    it('should respond succesfully', function (done) {
        request(options, async (err, res, body) => {

            console.log(body);

            done();
        });
    });
});