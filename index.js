 const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const mongoURI = "mongodb+srv://kmrchandan006:chandan%40123@cluster0.dqtnskf.mongodb.net/yourDatabaseName";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Define Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: Number,
    email: String,
    street: String,
    city: String,
    state: String,
    country: String,
    loginId: String,
    password: String,
});

// Define Model
const User = mongoose.model('User', userSchema);

// Route to serve the registration form
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'Task1', 'public', 'index.html');
    console.log('Serving index.html from:', filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send(err);
        } else {
            console.log('File sent:', filePath);
        }
    });
});

// Placeholder route for form submission
app.post('/submit_registration', async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        email: req.body.email,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        loginId: req.body['login-id'],
        password: req.body.password,
    });

    console.log('Attempting to save new user:', newUser);

    try {
        await newUser.save();
        console.log('User registered successfully');
        res.status(200).send('User registered successfully!');
    } catch (err) {
        console.error('Error registering new user:', err);
        res.status(500).send('Error registering new user.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

