'use strict';
module.exports = {

    local: {
        host: 'localhost:27017',
        user: 'admin',
        password: 'admin',
        database: 'test',
        url: function () {
            return getUrl(this);
        }
    }

};

function getUrl(con) {
    return `mongodb://${con.user}:${con.password}@${con.host}/${con.database}`;
}