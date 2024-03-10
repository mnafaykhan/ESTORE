// We define a Joi schema (userSchema) to validate the request body for creating a new user.
// Inside the POST endpoint /users, we validate the incoming request body against the Joi schema.
// If the request data is valid, we create a new user in the database using Sequelize.
// If there are validation errors, we return a 400 Bad Request response with details of the validation errors.
// Error handling is included for database operations and server startup.


const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const Joi = require('joi');

const app = express();
const port = 3000;

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'ecom.sqlite',
});

// Define User model
const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password_hash: DataTypes.STRING,
    gender_id: { type: DataTypes.INTEGER, allowNull: true },
    dob: DataTypes.DATEONLY,
    role_id: { type: DataTypes.INTEGER, allowNull: true },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Joi schema for user creation
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    dob: Joi.date().iso(),
    // Add more validations as needed
});

// Endpoint for creating a new user
app.post('/users', async (req, res) => {
    try {
        // Validate request data against Joi schema
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Create user in database using Sequelize
        const user = await User.create(value);

        return res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
