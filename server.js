const express = require('express');
const fs = require('fs');
const path = require('path')
const addNotes = require('./db/db.json');
const PORT = process.env.PORT || 3004;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// function to create notes
function createAddNote(body, noteArray) {
    const addNote = body;
    // prevent overide of new notes (adds to array)
    if (!Array.isArray(noteArray))
    noteArray = [0];
    if (noteArray.length == 0)
    noteArray.push(0);
    // adds id to note/body starting at 0
    body.id = noteArray[0];
    noteArray[0]++;
    // pushed note to db.json
    noteArray.push(addNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        // populate json as 2 lines   
        JSON.stringify(noteArray)
    );
    // returns new note
    return addNote;
};

//review zookeepr
app.get('/api/notes', (req, res) => {
    // removes undefined note thats populating
    res.json(addNotes.slice(2));
});

app.get('/', (req, res ) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// post app to html
app.post('/api/notes', (req, res) => {
    const addNote = createAddNote(req.body, addNotes);
    res.json(addNote);
});


// delete note see assets/index.js
// app.delete('/api/notes/:id', (req, res) => {
//     deleteNote
// )};

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});