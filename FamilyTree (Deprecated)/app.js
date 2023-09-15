// init express
const express = require('express');
const app = express();

// init body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// init mongoose
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/families");

const Family = mongoose.model("Family", new mongoose.Schema({
    // family name
    name: String,
    // family colors
    colors: [],
    // array of root family member(s)
    roots: [],
    // object storing all family members
    members: {}
}));

/* 
 * FUNCTIONS
 */
 // returned a properly formatted person object
function newPerson(fullName, nickname, instrument, year, big) {
    // formats given names to remove spaces
    fullName = new String(fullName).replace(/ /g, "_");
    nickName = new String(nickname).replace(/ /g, "_");
    return {
        _id: fullName + "-" + nickName,
        fullName: fullName,
        nickname: nickname,
        instrument: instrument,
        year: year,
        big: big,
        littles: []
    };
}

// returns a properly formatted Family object
// colors is an array
function newFamily(name, colors) {
    return {
        name: name,
        colors: colors,
        roots: [],
        members: {}
    };
}

// inserts a given family object into the database
async function createFamily(family) {
    await Family.create(family, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("SUCCESSFULLY ADDED FAMILY: " + family.name);
            console.log(results);
        }
    });
}

// inserts a given person object as a member into the given family
async function insertMember(family, person) {
    let location = "members." + person._id;
    await Family.updateOne({
        name: family
    }, {
        location: person
    }, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("SUCCESSFULLY ADDED PHILLIP");
            console.log(results);
        }
    });
}

// inserts a given person object as a root of a given family
async function insertRoot(family, person) {
    let location = "members." + person._id;
    await Family.updateOne({
        name: family
    }, {
        location: person
    }, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("SUCCESSFULLY ADDED ROOT");
            console.log(results);
        }
    });
}

async function run() {
    await createFamily(newFamily("Marks", ["Black", "Pink"]));
    // await insertRoot("Marks", newPerson("Zachary Price", "Darth Vader", "Trumpet", 4, "root"));
    await insertMember("Marks", newPerson("Zachary Price", "Darth Vader", "Trumpet", 4, "root"));
}

run();