import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRouter from './routes/user.route';
import todolistRouter from './routes/todolist.route';
import { verifyToken } from './middlewares/authentication.middlewares';
import { createTryBody } from './controllers/try.body.route';

const app = express();

// Middleware
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use("/user", userRouter)

app.use("/todolist",verifyToken, todolistRouter)
app.post('/api/v2/suppliers/test-update-price', createTryBody);

export default app;