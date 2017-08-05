const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const express = require('express');
const app = express();
const firebaseApp = firebase.initializeApp(functions.config().firebase);

function getFacts() {
    const ref = firebaseApp.database().ref('auth_user');
    return ref.once('value').then(snap=> snap.val());
}


function addAuthUser() {
    const ref = firebaseApp.database().ref('auth_user');
    return ref.set({
        "username" : "sazzad",
        "password" : "$2a$06$KDIFlcJDtQOfPnLp/Llwt..UNP6HzrsIZ2CP81/OehgO5zMZcdbGu"
    });
}

app.get('/', (request,res)=>{
    getFacts().then(facts =>{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(facts));
    });
});


app.post('/', (request,res)=>{
    getFacts().then(facts =>{
        res.setHeader('Content-Type', 'application/json');
        res.send(addAuthUser());

    });
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app= functions.https.onRequest(app);
