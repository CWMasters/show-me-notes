const express = require('express');
const fs = require('fs');
const path = require('path')
const addNotes = require('./db/db.json');
const PORT = process.env.PORT || 3004;
const app = express();
// const req = require('express/lib/request');
// const uuid = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(addNotes.slice(1));
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
        JSON.stringify(noteArray, null, 2)
    );
    return addNote;
};

app.post('/api/notes', (req, res) => {
    const addNote = createAddNote(req.body, addNotes);
    res.json(addNote);
});

// function to delete notes
function deleteNotes(id, noteArray) {
    for (let i = 0; i < noteArray.length; i++) {
        let note = noteArray[i];

        if (note.id == id) {
            noteArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(noteArray, null, 2)
            );

            break;
        }
    }
}

app.delete('api/notes/:id', (req, res) => {
    deleteNotes(req.params.id, addNotes);
    res.json(true);
});
    

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});