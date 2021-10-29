const express = require("express");
const ejs = require("ejs");
const weather = require('openweather-apis');

//init app
const app = express();

//for the management of the static css stylesheet
app.use(express.static("public"));

//set the template engine
app.set('view engine', 'ejs');

//retrieve the data from request
app.use(express.urlencoded({extended: true}));

let today = new Date();

    let dayOfWeek = today.getDay();
    let monthOfYear = today.getMonth();
    let dayOfMonth = today.getDate();   

    let weekList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let day = weekList[dayOfWeek];
    let month = monthList[monthOfYear];

//page loaded by default
app.get("/", (req, res) => {

    res.render('home', {
        infoWeather : null,
        day : day,
        month : month,
        dayOfMonth : dayOfMonth
    });    
});

app.post("/", (req, res) => {

    weather.setLang('en');
    weather.setCity(req.body.city);
    weather.setAPPID("ccd2ee41394f26801f65c853ae92bb7c");
            
    weather.getAllWeather(function (err, infoWeather) {
        res.render("home", {
            infoWeather: infoWeather,
            day: day,
            month : month,
            dayOfMonth : dayOfMonth    
        });
    }); 
});

app.listen(3000, function() {
    console.log("Server is running at http://localhost:3000");
});