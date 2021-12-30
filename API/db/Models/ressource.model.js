const mongoose = require('mongoose');

const RessourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    localisation: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required:true
    }
})

const Ressource = mongoose.model('Ressource', RessourceSchema);

module.exports = { Ressource }