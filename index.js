const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization']
}));

app.options('*', cors());
app.use(express.json());

app.get('/team', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  const r = await fetch('https://api.clickup.com/api/v2/team', {
    headers: { Authorization: apiKey }
  });
  const data = await r.json();
  res.json(data);
});

app.get('/tasks/:teamId', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  const r = await fetch(`https://api.clickup.com/api/v2/team/${req.params.teamId}/task?statuses[]=open&statuses[]=in+progress&statuses[]=to+do&page=0&limit=50`, {
    headers: { Authorization: apiKey }
  });
  const data = await r.json();
  res.json(data);
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy running'));
