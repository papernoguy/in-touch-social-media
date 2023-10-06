const mongoose = require('mongoose');
//const connectToDatabase = require('./config/db');
const User = require('./models/user');
const { connectToDatabase, disconnectFromDatabase } = require('./config/db');


async function createUser(username, password, email, profilePictureRef, address, bio) {
    const newUser = new User({
        username,
        passwordHash: password, // Assuming you'll hash the password before storing it
        email,
        profilePictureRef,
        address,
        bio,
    });

    try {
        await newUser.save();
        console.log(`User "${username}" created successfully.`);
    } catch (error) {
        console.error(`Error creating user "${username}":`, error);
    }
}

// Function to create multiple users
async function createUsers() {
    await connectToDatabase(); // Connect to your database

    // You can define an array of user data here
    const usersData = [
        {
            username: 'user3',
            password: 'password3',
            email: 'user3@example.com',
            // Other user data fields as needed
        },
        {
            username: 'user4',
            password: 'password4',
            email: 'user4@example.com',
            // Other user data fields as needed
        },
        {
            username: 'user5',
            password: 'password5',
            email: 'user5@example.com',
            // Other user data fields as needed
        },
        {
            username: 'user6',
            password: 'password6',
            email: 'user6@example.com',
            // Other user data fields as needed
        },
        // Add more user data objects as needed
    ];

    // Loop through the user data and create users
    for (const userData of usersData) {
        await createUser(
            userData.username,
            userData.password,
            userData.email,
            userData.profilePictureRef,
            userData.address,
            userData.bio
        );
    }

    // Disconnect from the database when done (optional)
    await disconnectFromDatabase();
}

// Call the function to create users
createUsers().then(r => console.log("done"));
