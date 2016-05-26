'use strict';

//require("babel-core/register");
//require("babel-polyfill");

const bcrypt = require('bcryptjs');

const pw = 'test';
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync(pw, salt);

console.log(hash);

