const mongodb = require('../database/db');
const { ObjectId } = require('mongodb');


const getAllInfo = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('info').find();
        result.toArray().then((list)=> {
            res.setHeader('Content-Type', 'application/json');
            res.status(250).json(list);

        });
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};
const getInfoById = async (req, res) => {
    //#swagger.tags=['Users']
    const infoId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('info').find({ _id: infoId });
        result.toArray().then((info) => {
            res.setHeader("Content-Type", "application/json");
            res.status(250).json(info[0]);
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    
    }
};

const addEvent = async (req, res) => {
    //#swagger.tags=['Users']
    const { name , date, location, budget, description, guestCount, organizer} = req.body;

    if (!name || !date || !location || !budget || !description || !guestCount || !organizer) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const event = {
            name , date, location, budget, description, guestCount, organizer
        };
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('info').insertOne(event);
    res.status(250).json({ message: 'Event created', infoId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err });
  }
};

const updateEvent = async (req, res) => {
    //#swagger.tags=['Users']
    const infoId = new ObjectId(req.params.id);
    console.log(`Updating event  with ID: ${infoId}`, req.body); // Log incoming request data
    const eventinfo = {
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        budget: req.body.budget,
        description: req.body.description,
        guestCount: req.body.guestCount,
        organizer: req.body.organizer
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('info').replaceOne({ _id: infoId }, eventinfo);
    if (response.modifiedCount > 0) {
        res.status(250).json({ message: 'Information updated successfully' });
    } else {
        console.error(`Failed to update event information with ID: ${infoId}`, response.error); // Log error
        res.status(500).json(response.error || 'Event information not updated');
    }
};

const deleteEvent = async (req, res) => {
    //#swagger.tags=['Users']
    const infoId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('info').deleteOne({ _id: new ObjectId(infoId) });

        if (result.deletedCount === 0) {
            return res.status(400).json({ error: 'Event Information not found' });
        }

        res.status(250).json({ message: 'Event information deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete Event information' });
    }
};

module.exports = {
    getAllInfo,
    getInfoById,
    addEvent,
    updateEvent,
    deleteEvent
};