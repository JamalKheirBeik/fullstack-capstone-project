//Step 1 - Task 2: Import necessary packages
const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');

//Step 1 - Task 3: Create a Pino logger instance
const pino = require('pino');  // Import Pino logger
const logger = pino();  // Create a Pino logger instance

dotenv.config();
//Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();
        // Task 2: Access MongoDB collection
        const collection = db.collection('users');
        //Task 3: Check for existing email
        const user = await collection.findOne({ email });
        if (user) {
            return res.status(404).json({ message: "Account already exists for this email" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
        //Task 4: Save user details in database
        const newUser = { firstName, lastName, email, password: hash, createdAt: new Date() };
        const result = await collection.insertOne(newUser);
        //Task 5: Create JWT authentication with user._id as payload
        const payload = {
            user: {
                id: result.insertedId
            }
        };
        const token = jwt.sign(payload, JWT_SECRET);

        logger.info('User registered successfully');
        res.json({ authtoken, email });
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;