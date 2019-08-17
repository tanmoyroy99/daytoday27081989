const mongoose = require('mongoose');

const notepad = new mongoose.Schema({
    user_id: {
        type: String, required: true, minlength: 1,  maxlength: 1024
    },
    name: {
        type: String, required: true,  maxlength: 50
    },
    notepad: {
        type: String, minlength: 3, maxlength: 20048,
    },
    system_note: {
        type: String, minlength: 3, maxlength: 2048,
    },
    update_datetime: {
		type: String, minlength: 5, maxlength: 50,  default: Date.now(),
    },
    status: {
        type: Boolean,  default: false
      }, 
});

const Notepad = mongoose.model('Notepad', notepad );
exports.Notepad = Notepad;