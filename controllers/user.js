const mongodb = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('users').find();
        result.toArray().then((user) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(user); // Return list
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const usersId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: usersId });
            result.toArray().then((user) => {
                res.setHeader("Content-Type", "application/json");
                res.status(250).json(user[0]);
            });
    } catch (err) {
        res.status(500).json({ error: err.message });
            
    }
};
const addUser = async (req, res) => {
    //#swagger.tags=['Users']
    const { name , email, password, role, created_at, status, last_login} = req.body;

    if (!name || !email|| !password || !role || !created_at || !status || !last_login) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const user = {
            name , email, password, role, created_at, status, last_login
        };
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('users').insertOne(user);
        res.status(250).json({ message: 'New user added', usersId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating new user', error: err });
  }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const usersId = new ObjectId(req.params.id);
    console.log(`Updating event  with ID: ${usersId}`, req.body); // Log incoming request data
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        created_at: req.body.created_at,
        status: req.body.status,
        last_login: req.body.last_login
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('users').replaceOne({ _id: usersId }, user);
    if (response.modifiedCount > 0) {
        res.status(250).json({ message: 'User updated successfully' });
    } else {
        console.error(`Failed to update User with ID: ${usersId}`, response.error); // Log error
        res.status(500).json(response.error || 'User not updated');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const usersId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: new ObjectId(usersId) });

        if (result.deletedCount === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        res.status(250).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete User' });
    }
};

module.exports = {
    getAll,
    getSingle,
    addUser,
    updateUser,
    deleteUser
};