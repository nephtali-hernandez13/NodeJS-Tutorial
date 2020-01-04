'use strict';
const pg = require('pg');
const express = require('express');
const app = express();

const config = {
    user: 'postgres',
    database: 'nodejs',
    password: 'adminpassword',
    port: 5432
};

const pool = new pg.Pool(config);

app.get('/', (req, res, next) => {
    pool.connect( function(err, client, done) {
        if( err ) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT * FROM users', function( err, result ) {
            done();
            if( err ) {
                return next(err)
            }
            res.json(result.rows);
        })
    })
});

app.post('/users', (req, res, next) => {
    //const user = req.body;
    const user = { name: 'Nephtali', age: 22 };
    pool.connect( function(err, client, done) {
        if( err ) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('INSERT INTO users(name, age) VALUES ($1, $2);', [user.name, user.age], ( err, result ) => {
            done();
            if( err ) {
                return next(err);
            }
            res.sendStatus(200);
        })
    })
});

app.listen(4000, function(){ console.log('Server is running on port 4000') });