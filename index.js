const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.get('/team', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  const r = await fetch('https://api.clickup.com/api/v2/team', {
    headers: { Authorization: apiKey }
  });
  res.json(await r.json());
});

app.get('/tasks/:teamId', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  const r = await fetch(`https://api.clickup.com/api/v2/team/${req.params.teamId}/task?statuses[]=open&statuses[]=in+progress&statuses[]=to+do&page=0&limit=50`, {
    headers: { Authorization: apiKey }
  });
  res.json(await r.json());
});

app.listen(process.env.PORT || 3000, () => console.log('Running'));
