const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/freelancehub');


const User = mongoose.model('User', new mongoose.Schema({
email: String,
password: String
}));


const Project = mongoose.model('Project', new mongoose.Schema({
title: String
}));


// Register
app.post('/register', async (req, res) => {
const hash = await bcrypt.hash(req.body.password, 10);
await User.create({ email: req.body.email, password: hash });
res.send('Registered');
});


// Login
app.post('/login', async (req, res) => {
const user = await User.findOne({ email: req.body.email });
if (!user) return res.status(404).send('User not found');


const isValid = await bcrypt.compare(req.body.password, user.password);
if (!isValid) return res.status(401).send('Wrong password');


const token = jwt.sign({ id: user._id }, 'secret');
res.json({ token });
});


// Projects
app.get('/projects', async (req, res) => {
const projects = await Project.find();
res.json(projects);
});


app.post('/projects', async (req, res) => {
await Project.create({ title: req.body.title });
res.send('Project added');
});


app.listen(5000, () => console.log('Server running'));