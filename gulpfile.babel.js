'use strict';

require('babel-core/register');
require('babel-polyfill');
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import ngConstant from 'gulp-ng-constant';
import {argv} from 'yargs';


const environment = argv.env || 'development';
const port = argv.port || 3000;
const config = argv.config;

// Default
gulp.task('default', async() => {
    console.log(`Environment: ${environment}`);
    console.log(`Port: ${port}`);
    let ip = await Promise.resolve(getIpAddress());
    console.log(`Ip: ${ip}`);

    if (config) {
        await gulp.src('config/' + 'client' + '.json')
            .pipe(ngConstant({
                name: 'appConfig',
                constants: {
                    ip: `${ip}:${port}`
                }
            }))
            .pipe(gulp.dest('public/javascripts/'));
    }

    nodemon({
        exec: "babel-node",
        script: 'bin/www',
        ext: 'js',
        env: {
            'NODE_ENV': environment,
            'PORT': port,
            'IP': ip
        }
    });
});


// get the local ip address for this computer
function getIpAddress() {
    return new Promise((resolve, reject) => {
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
            if (err) reject(err);
            else {
                resolve(add);
            }
        });
    });
}