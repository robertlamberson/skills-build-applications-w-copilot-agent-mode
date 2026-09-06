import express from 'express';
import mongoose from 'mongoose';
import { Activity, User } from './models/index.js';

export const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', baseUrl });
});

app.get('/api/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ displayName: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities', async (_request, response, next) => {
  try {
    response.json(await Activity.find().sort({ completedAt: -1 }).populate('userId', 'displayName username').lean());
  } catch (error) {
    next(error);
  }
});

async function startServer() {
  await mongoose.connect(connectionString);
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on ${baseUrl}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((error) => {
    console.error('Unable to start OctoFit Tracker API:', error);
    process.exitCode = 1;
  });
}

//ral was here