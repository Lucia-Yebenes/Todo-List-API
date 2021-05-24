
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser } from './actions';
import { createUserTask } from './actions';
import { getUserTask } from './actions';
import { upDataTask } from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(createUser));
//crear una todolist
router.post('/todolist/:id', safe(createUserTask));
router.get('/todolist/:id', safe(getUserTask));
router.put('/todolist/:id', safe(upDataTask));


export default router;
