var mongoose = require('mongoose');
var notesSchema = mongoose.Schema({
    heading:{ type: String,required:true},
    description:{ type: String,required:true}
});

module.exports = mongoose.model('Note',notesSchema);