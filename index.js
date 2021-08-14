if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override');
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
var fs = require('fs');
const { rejects } = require('assert')
const { resolve } = require('path')
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");
app.use(express.static(__dirname + "/views"));

// const initializePassport = require('./modules/passport-config')
// require('dotenv').config({ path: __dirname + '/env/.env' })
// initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
// )
// app.use(function (req, res, next) {
//     res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//     next();
// });
// const users = [{
//     id: '1628785452199',
//     name: 'Muthazhagan C',
//     email: process.env.ADMIN_EMAIL,
//     password: process.env.PASS
// }]
// app.set('view-engine', 'ejs')
// app.use(express.urlencoded({ extended: false }))
// app.use(flash())
// app.use(session({
//     secret: " process.env.SESSION_SECRET",
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))
// app.get('/', checkAuthenticated, (req, res) => {
//     res.render('dashboard.ejs', { name: req.user.name })
// });
app.get('/', (req, res) => {
    res.render('dashboard.ejs', { shop: shopCount, user: userCount, calls: callsReceived })
});
app.get('/shopDetails', (req, res) => {
    res.render('shop.ejs', { shopDetails: shops })
});
app.get('/userDetails', (req, res) => {
    res.render('user.ejs', { userDetails: userdata })
});
// app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
// })
// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))
// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// })
// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('/login')
// }
// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/')
//     }
//     next()
// }

var config = {
    apiKey: "AIzaSyCREuP3p8E_Nr53YZ4PsZe5MPwfZLVBJT8",
    authDomain: "galvanized-math-306504.firebaseapp.com",
    databaseURL: "https://galvanized-math-306504-default-rtdb.firebaseio.com",
    projectId: "galvanized-math-306504",
    storageBucket: "galvanized-math-306504.appspot.com",
    messagingSenderId: "268616299795",
    appId: "1:268616299795:web:c9c48ad0c48b19bc6016e6",
    measurementId: "G-RCENTRXS78"
};

let shopCount, userCount, callsReceived;
//initialize your firebase
firebase.initializeApp(config);
var database = firebase.database();
//create a variable to hold our orders list from firebase
var firebaseOrdersCollection = database.ref().child('Shops');

//create a 'listener' which waits for changes to the values inside the firebaseOrdersCollection 
firebaseOrdersCollection.on('value', function (orders) {

    //create an empty string that will hold our new HTML
    var allOrdersHtml = "";
    let a = 0;
    //this is saying foreach order do the following function...
    orders.forEach(function (firebaseOrderReference) {
        a = a + 1;
        //this gets the actual data (JSON) for the order.
        var order = firebaseOrderReference.val();
    });

    //actaull put the html on the page inside the element with the id PreviousOrders
    shopCount = a;

    //note: an alternative approach would be to create a hidden html element for one order on the page, duplicate it in the forEach loop, unhide it, and replace the information, and add it back. 
});

//create a variable to hold our orders list from firebase
var firebaseOrdersCollection = database.ref().child('Users');

//create a 'listener' which waits for changes to the values inside the firebaseOrdersCollection 
firebaseOrdersCollection.on('value', function (orders) {

    //create an empty string that will hold our new HTML
    var allOrdersHtml = "";
    let a = 0;
    //this is saying foreach order do the following function...
    orders.forEach(function (firebaseOrderReference) {
        a = a + 1;
        //this gets the actual data (JSON) for the order.
        var order = firebaseOrderReference.val();
    });

    //actaull put the html on the page inside the element with the id PreviousOrders
    userCount = a;

    //note: an alternative approach would be to create a hidden html element for one order on the page, duplicate it in the forEach loop, unhide it, and replace the information, and add it back. 
});



var firebaseOrdersCollection = database.ref().child('Shops');

firebaseOrdersCollection.on('value', function (orders) {

    //create an empty string that will hold our new HTML
    var allOrdersHtml = "";
    let a = 0;
    //this is saying foreach order do the following function...
    orders.forEach(function (firebaseOrderReference) {


        //this gets the actual data (JSON) for the order.
        var order = firebaseOrderReference.val();

        if ((order.Activity) != undefined) {
            a = a + 1;
        }

    });
    callsReceived = a;
    //actaull put the html on the page inside the element with the id PreviousOrders


    //note: an alternative approach would be to create a hidden html element for one order on the page, duplicate it in the forEach loop, unhide it, and replace the information, and add it back. 
});
let shops;
var shopLists = database.ref().child('Shops');
//create a 'listener' which waits for changes to the values inside the shopLists 
shopLists.on('value', function (orders) {
    //create an empty string that will hold our new HTML
    var allOrdersHtml = "";

    //this is saying foreach order do the following function...
    orders.forEach(function (firebaseOrderReference) {
        //this gets the actual data (JSON) for the order.
        var order = firebaseOrderReference.val();

        var individialOrderHtml = `<tr><td> ` + order.area + `</td><td> ` + order.city + `</td><td> ` + order.country + `</td><td> ` + order.doorNo + `</td><td> ` + order.email + `</td><td> ` + order.fullname + `</td><td> ` + order.lat + `</td><td> ` + order.lon + `</td><td> ` + order.phoneNo + `</td><td> ` + order.pinCode + `</td><td> ` + order.shopClose + `</td><td> ` + order.shopName + `</td><td> ` + order.shopOpen + `</td><td> ` + order.shopType + `</td><td> ` + order.shopWork + `</td><td> ` + order.state + `</td></tr>`;        //add the individual order html to the end of the allOrdersHtml list
        allOrdersHtml = allOrdersHtml + individialOrderHtml;
    });
    //actaull put the html on the page inside the element with the id PreviousOrders
    shops = (allOrdersHtml).toString();

    //note: an alternative approach would be to create a hidden html element for one order on the page, duplicate it in the forEach loop, unhide it, and replace the information, and add it back. 
});

var userdatas = database.ref().child('Users');
//create a 'listener' which waits for changes to the values inside the userdatas 
userdatas.on('value', function (orders) {
    //create an empty string that will hold our new HTML
    var allOrdersHtml = "";
    //this is saying foreach order do the following function...
    orders.forEach(function (firebaseOrderReference) {
        //this gets the actual data (JSON) for the order.
        var order = firebaseOrderReference.val();
        var individialOrderHtml = `<tr><td> ` + order.email + `</td><td> ` + order.fullname + `</td><td> ` + order.phone + `</td></tr>`;
        //add the individual order html to the end of the allOrdersHtml list
        allOrdersHtml = allOrdersHtml + individialOrderHtml;
    });
    //actaull put the html on the page inside the element with the id PreviousOrders
    userdata = allOrdersHtml;
    //note: an alternative approach would be to create a hidden html element for one order on the page, duplicate it in the forEach loop, unhide it, and replace the information, and add it back. 
});

///////////////////////////////////////////
/////////handel new user
let readFirebasedata = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(err.message);
            resolve(data);
        })
    })
}
// function datas(data) {
//     console.log(data.name)
// }
let oldFireDatas = [];
let returnfromFire = async () => {
    let userData = await readFirebasedata(`${__dirname}/json/firebase.json`);
    return (`${userData}`);
}


let checkFiredata = async () => {
    let userdata = await returnfromFire();
    // console.log(JSON.parse(userdata)));
    let anotherUserData = JSON.parse(userdata);
    return (anotherUserData)
}
let news = checkFiredata();

var check_child_added = database.ref().child("Users");
// let jsonData = JSON.parse(firebasejson);
// console.log(firebasejson)
check_child_added.on("child_added", function (data, prevChildKey) {

    var newPlayer = data.val();
    news.then(data => {
        // let arr = data.map(el => checkUserDetails(el, newPlayer, data));
        // console.log("new" + arr)

        for (let i = 0; i < data.length; i++) {
            if (data[i].emilId !== newPlayer.emilId) {
                if (data[i].phoneNumber !== newPlayer.phoneNumber) {
                    data.push(newPlayer);
                    json = JSON.stringify(data);
                    console.log(json + "fdsfdsf")
                    fs.writeFile(`${__dirname}/json/firebase.json`, json, (err) => {
                        // Error checking
                        if (err) throw err;
                        console.log("New data added");
                    });
                }
                else {
                    console.log("Phone number already registered");
                    break;
                }
            }
            else {
                console.log(+"Email aleready regsiterd");
                break;
            }
        }
        // {

        // }



    });
});
// function checkUserDetails(json, base, fullData) {

//     // const intersection = json.emilId.filter(element => emailId.includes(element));

//     if (json.emilId !== base.emilId) {
//         if (json.phoneNumber !== base.phoneNumber) {
//             fullData.push(base);
//             json = JSON.stringify(fullData);

//             fs.writeFile(`${__dirname}/json/firebase.json`, json, (err) => {
//                 // Error checking
//                 if (err) throw err;
//                 console.log("New data added");
//             });
//             console.log(base)
//             //     obj = JSON.parse(a); //now it an object
//             //     obj.push(base); //add some data
//             //     json = JSON.stringify(obj); //convert it back to json
//             //     fs.writeFile(`${__dirname}/json/firebase.json`, json, 'utf8', callback);
//         }
//         else {
//             throw err;
//             // return console.log(json.phoneNumber + "your phonenumber aleready registerd");

//         }
//     }
//     else {
//         throw err;
//         // return console.log(json.emilId + "your email address adread regstered");

//     }
// }
app.listen(8081);
