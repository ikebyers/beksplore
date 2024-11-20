import mongoose from 'mongoose';
import User from '../models/User.js';
import Thought from '../models/Thought.js';
import { usernames, getRandomThoughts } from './data.js';

const seedDatabase = async (): Promise<void> => {
    try {
        console.log('Connecting to MongoDB...');
        // Replace with your MongoDB connection string
        await mongoose.connect('mongodb://localhost:27017/beksploreDB');

        console.log('Connected to MongoDB.');

        console.log('Seeding database...');

        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Create mock users
        const users = usernames.map((username) => ({
            username,
            email: `${username.toLowerCase()}@example.com`,
        }));

        // Insert users into the database
        const createdUsers = await User.insertMany(users);
        console.log('Users seeded:', createdUsers);

        // Generate thoughts with reactions
        const thoughts = getRandomThoughts(10);

        // Assign thoughts to random users
        for (const thought of thoughts) {
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];

            const createdThought = await Thought.create(thought);

            // Update the user with the new thought
            await User.findByIdAndUpdate(randomUser._id, {
                $push: { thoughts: createdThought._id },
            });
        }

        console.log('Seeding complete!');
    } catch (err) {
        console.error('Error seeding the database:', err);
    } finally {
        mongoose.connection.close();
        console.log('Connection to MongoDB closed.');
    }
};

seedDatabase();