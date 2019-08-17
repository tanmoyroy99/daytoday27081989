const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Notepad } = require('../models/notepad_db');
const authentication = require('../middleware/authentication');



router.get('/view/',authentication, async (req, res) =>{
	const notepadviewAll = await Notepad.find({ user_id: req.userdata._id});
	res.send(notepadviewAll);
});


router.get('/add/',authentication, async (req, res) =>{
	let user_agent= req.get('User-Agent');
    let ip_address = req.connection.remoteAddress;
    
    let notepadAdd = {
                    user_id: req.userdata._id,
                    name: req.body.name,
                    notepad: req.body.notepadInfo,
                    system_note: JSON.stringify({"User Agent": user_agent, "IP Address":ip_address}),
                    update_datetime:  Date.now(),
                    status: true,
                }
    let dataoption = { upsert: true, new: true, setDefaultsOnInsert : true}

    notepadAdd = await Notepad.findOneAndUpdate({'user_id': req.userdata._id },notepadAdd,dataoption);
    res.send(notepadAdd);

});