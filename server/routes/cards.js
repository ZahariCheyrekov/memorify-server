import express from 'express';

import { createCard, deleteCard, getCard, getCards, likeCard, postComment, updateCard } from '../controllers/cards.js';

import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.get('/', getCards);
router.post('/', auth, createCard);
router.get('/:id', getCard);
router.patch('/:id', auth, updateCard); 
router.delete('/:id', auth, deleteCard);
router.patch('/:id/likeCard', auth, likeCard);
router.patch('/:id/comments', auth, postComment);

export default router;