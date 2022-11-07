/*
 * DESIGN NOTES:
 * 
 * This family tree is centered around the familyTree object. The familyTree
 * object stores family objects inside of it. These family objects are created 
 * by the newFamily function. They contain a name, as well as an array of members.
 * These members are person objects created by the newPerson function. It is
 * structured in a very nested, tree-like manner, fitting of the name "family tree".
 * 
 * The HTML dropdown menu for family selection is created using the updateFamilies 
 * function. It reads from the familyTree object, comparing which families are 
 * already in the HTML list, and adding those which are not.
 */


/*
 * FUNCTIONS AND CONSTANTS
 */

// this is the overarching object which all family objects are stored inside of.
const familyTree = {};

// function to create a new person object given required info
// nested inside of the members array of a family object
const newPerson = function (nameIn, nicknameIn, yearIn, bigIn, littlesIn, instrumentIn, photoIn, familyIn) {
    return {
        name: nameIn,
        year: yearIn,
        big: bigIn,
        littles: littlesIn,
        nickname: nicknameIn,
        instrument: instrumentIn,
        family: familyIn,
        photo: photoIn
    };
}

// function to create a new family object given a name
// nested inside of familyTree
const newFamily = function (nameIn) {
    return {
        name: nameIn,
        members: []
    }
}

// updates family dropdown list in the HTML form based on
// the familyTree object
const updateFamilies = function() {
    let familyList = document.querySelectorAll(".familyOption");
    const familySelect = document.querySelector("#family");
    let found = false;
    Object.values(familyTree).forEach(function(treeEntry) {
        for (let i = 0; i < familyList.length; i++) {
            if (familyList[i].innerHTML == treeEntry.name) {
                found = true;
                break;
            }
        }
        if (found) {
            found = false;
        } else {
            let newFam = document.createElement("option");
            newFam.value = treeEntry.name;
            newFam.innerHTML = treeEntry.name;
            newFam.setAttribute("class", "familyOption");
            familySelect.appendChild(newFam);
        }
    });
}

// converts a String list to an array and trims the space
// off of each element in the array
const listToArray = function(list) {
    let output = list.split(",");
    for (let i = 0; i < output.length; i++) {
        output[i] = output[i].trim();
    }
    return output;
}

/*
 * EVENT LISTENERS
 */

// gets info from person form and adds it to the
// appropriate family members array in the familyTree object
const personButton = document.querySelector("#submitPerson");
personButton.onclick = function () {
    let fullname = personButton.form.fullname.value,
        year = personButton.form.year.value,
        nickname = personButton.form.nickname.value,
        instrument = personButton.form.instrument.value,
        big = personButton.form.big.value,
        littles = personButton.form.littles.value,
        family = personButton.form.family.value,
        photo = personButton.form.photo.value;

    familyTree[family].members.push(newPerson(fullname, nickname,
        year, big, listToArray(littles), instrument, photo, family));
    
    // attempt to clear inputs. dropdowns dont work and prompted to enter new values
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text") {
            inputs[i].value = "";
        }
    }
    let dropdowns = document.querySelectorAll("select");
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns.selectedIndex = 1;
    }
    document.getElementById("notice").innerHTML = fullname + " has been added to " + family;
}

// creates a new family object within the familyTree object
const familyButton = document.querySelector("#submitFamily");
familyButton.onclick = function() {
    let newFam = familyButton.form.familyName.value;
    familyTree[newFam] = newFamily(newFam);
    document.getElementById("notice").innerHTML = "Added " + newFam;
    document.getElementById("familyName").value = "";
    updateFamilies();
}

// stops page from reloading on a person being added.
// TODO: when submitted, clear all form input
let personForm = document.getElementById("personForm");
let familyForm = document.getElementById("familyForm");
function handleForm(event) { event.preventDefault(); }
personForm.addEventListener('submit', handleForm);
familyForm.addEventListener('submit', handleForm);


/*
 * RUN ON PAGE LOAD
 */

// TODO: sync with database of families and members

// update families in HTML family list
updateFamilies();