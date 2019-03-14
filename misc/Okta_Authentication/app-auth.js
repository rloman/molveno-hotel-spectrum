"use strict";

const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const fs = require('fs');
const cors = require('cors');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-836551.okta.com/oauth2/default',
    clientId: '0oacon2wj5UncDV7E356',
    assertClaims: {
        aud: 'api://default',
    },
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        return res.status(401).end();
    }

    const accessToken = match[1];

    return oktaJwtVerifier.verifyAccessToken(accessToken)
        .then((jwt) => {
            req.jwt = jwt;
            next();
        })
        .catch((err) => {
            res.status(401).send(err.message);
        });
}

const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/guests', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('guests.html', function (err, data) {
        res.write(data);
        res.end();
    });
});

app.get('/implicit/callback', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('login.html', function (err, data) {
        res.write(data);
        res.end();
    });
});

app.listen(8081, () => {
    console.log('Serve Ready on port 8081');
});
