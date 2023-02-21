import { Router } from "express";
import { login, register } from "./controllers/auth.controller.js";
import { createCandidate, getCandidates, voteCandidate } from "./controllers/elections.controller.js";
import { test } from "./controllers/test.controller.js";
import { getProductByName, getUser, posts } from "./controllers/user.controller.js";
import { authenticateToken } from "./middlewares.js";


const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/user', authenticateToken, getUser);
router.get('/posts', authenticateToken, posts);
router.get('/posts/name/:name', authenticateToken, getProductByName);
router.post('/candidates/create', authenticateToken, createCandidate);
router.get('/candidates/:type/:postName', authenticateToken, getCandidates);
router.patch('/vote/:candidateId', authenticateToken, voteCandidate);

//Test
router.get('/test/:id', test);

export default router;