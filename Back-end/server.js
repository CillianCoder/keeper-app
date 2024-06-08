const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/noteDB", { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = mongoose.Schema({
    title: String,
    content: String
});

const Note = mongoose.model("Note", noteSchema);


const server = require('http').createServer(app);


const wss = new WebSocket.Server({ server });

app.post('/notes', (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });

    newNote.save()
        .then(note => {
            console.log('Note added');
            broadcastNotes();
        })
        .catch(err => {
            console.error(err);
        });
});

app.get('/notes', (req, res) => {
    Note.find({})
        .then(foundNotes => {
            console.log('Notes fetched');
            res.json(foundNotes);
        })
        .catch(err => {
            console.error(err);
        });
});

app.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    Note.findByIdAndDelete(noteId)
        .then(() => {
            console.log(`Note with ID ${noteId} deleted`);
            broadcastNotes();
        })
        .catch(err => {
            console.error(err);
        });
});

function broadcastNotes() {
    Note.find({})
        .then(notes => {
            const message = JSON.stringify(notes);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        })
        .catch(err => console.error('Error broadcasting notes:', err));
}

server.listen(3000, () => {
    console.log("Server started on port 3000");
});
