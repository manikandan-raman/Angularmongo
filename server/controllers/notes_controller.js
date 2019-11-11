const Note = require('../models/notes_model');


exports.test = function (req, res) {
    console.log('inside test');
    res.send('Greetings from the Test controller!');
};

exports.create = (req,res) => {
    let notes = new Note(
        {
            heading: req.body.heading,
            description: req.body.description
        }
    );

    notes.save((err) => {
        if(err) throw err;
        res.json({
            'status': 1,
            'message':'Notes Created Successfully'
        });
    })
}

exports.notes_details = (req,res) => {
    Note.findById(req.params.id,(err,notes) => {
        if(err) throw err;
        res.send(notes);
    });
}

exports.notes = (req,res) => {
    Note.find({}).then(eachOne => {
        res.json(eachOne);
    })
}

exports.notes_update = (req,res) => {
    Note.findByIdAndUpdate(req.params.id,{$set: req.body},(err) => {
        if(err) throw err;
        res.json({
            'status': 1,
            'message':'Notes Updated Successfully'
        });
    })
}

exports.notes_delete = (req,res) => {
    Note.findByIdAndRemove(req.params.id,(err) => {
        if(err) throw err;
        res.send('Notes Deleted Successfully');
    })
}