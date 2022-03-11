const express = require('express');
const fs = require('fs');
const path = require('path')
const addNotes = require('./db/db.json');
const PORT = process.env.PORT || 3004;
const app = express();
// const uuid = require('uuid'); ????

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    // removes undefined
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

// function to create notes
function createAddNote(body, noteArray) {
    const addNote = body;
    if (!Array.isArray(noteArray))
    noteArray = [];

    if (noteArray.length === 0)
    noteArray.push(0);

    body.id = noteArray[0];
    noteArray[0]++;

    noteArray.push(addNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        // add 2 lines for json with null 2 (easier to read)
        JSON.stringify(noteArray, null, 2)
    );
    return addNote;
};

app.post('/api/notes', (req, res) => {
    const addNote = createAddNote(req.body, addNotes);
    res.json(addNote);
});

// delete note
// app.delete('/api/notes/:id', (req, res) => {
//     deleteNote
// )};

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});