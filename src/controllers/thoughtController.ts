import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' })
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { thoughts: thought._id },
        });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};


export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } }, // Push reaction data to reactions array
            { new: true, runValidators: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add reaction' });
    }
};

export const updateReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { thoughtId, reactionId } = req.params;
        const { reactionBody } = req.body;

        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId, 'reactions.reactionId': reactionId }, // Match the thought and the reaction
            { $set: { 'reactions.$.reactionBody': reactionBody } }, // Update the specific reaction's body
            { new: true, runValidators: true } // Return the updated thought
        );

        if (!thought) {
            res.status(404).json({ message: 'Thought or reaction not found' });
            return;
        }

        res.json(thought); // Respond with the updated thought
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update reaction' });
    }
};

export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove reaction' });
    }
};