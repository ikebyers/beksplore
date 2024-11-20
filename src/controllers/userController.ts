import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find()
            .populate('thoughts')
            .populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id)
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
        res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
        if (user && user.thoughts?.length) {
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and all of their thoughts have been deleted... permanently...' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } }, // add friend to friend array
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add friend' });
    }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } }, // Remove friend from friend array
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove friend' });
    }
};