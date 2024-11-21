import { Router } from 'express';
const router = Router();
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, updateReaction, removeReaction } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .put(updateReaction)
    .delete(removeReaction);

export default router;