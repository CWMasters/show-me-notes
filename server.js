const express = require('express');
const fs =require('fs');
const path = require('path')
const seeNotes = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(seeNotes);
});

app.post('/api/notes', (req, res) => {
    const addNote = createAddNote(req.body, seeNotes);
    res.json(addNote);
});






app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});