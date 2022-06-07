const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const fs = require('fs');
const path = require('path');
const allNotes = require('./db/db.json');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes.slice(1))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.post("/api/notes", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log(newNote);
    res.json(savedNotes);
})

