const notesCtrl = {};

const Note = require("../models/Note");

const _ = require("underscore");

notesCtrl.getNotes = async(req, res) => {
    try {
        const notes = await Note.find(); // {},{}
        res.json({
            ok: true,
            notes,
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

notesCtrl.createNote = async(req, res) => {
    let { title, content, date, author } = req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author,
    });
    try {
        let note = await newNote.save();
        res.json({
            ok: true,
            note: note,
            message: "Note save correctly",
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

notesCtrl.getNote = async(req, res) => {
    let id = req.params.id;
    try {
        let note = await Note.findById(id);
        res.json({
            ok: true,
            note: note,
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

notesCtrl.updateNote = async(req, res) => {
    let id = req.params.id;
    // arreglo de propiedades validas
    let body = _.pick(req.body, ["title", "content", "date", "author"]);
    try {
        let note = await Note.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
            context: "query",
        });
        res.json({
            ok: true,
            note: note,
            message: "Note Updated",
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

notesCtrl.deleteNote = async(req, res) => {
    let id = req.params.id;

    try {
        let noteDelete = await Note.findByIdAndDelete(id);
        res.json({
            ok: true,
            note: noteDelete,
            message: "Note Deleted",
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

module.exports = notesCtrl;