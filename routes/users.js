import express from 'express';

import { getUsers, signin, signup } from '../controllers/user.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;