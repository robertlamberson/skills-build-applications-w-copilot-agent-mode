import express from 'express';

export const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

type User = {
  id: string;
  username: string;
};

type Activity = {
  id: string;
  userId: string;
  type: string;
  durationMinutes: number;
};

const users: User[] = [];
const activities: Activity[] = [];

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', baseUrl });
});

app.get('/api/users', (_request, response) => {
  response.json(users);
});

app.get('/api/activities', (_request, response) => {
  response.json(activities);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on ${baseUrl}`);
  });
}

//ral was here