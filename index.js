const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/team', async (req, res) => {
  const apiKey = req.query.key || req.headers['x-api-key'];
  try {
    const r = await fetch('https://api.clickup.com/api/v2/team', {
      headers: { Authorization: apiKey }
    });
    const data = await r.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.json(data);
  } catch(e) {
    res.json({ err: e.message });
  }
});

app.get('/tasks/:teamId', async (req, res) => {
  const apiKey = req.query.key || req.headers['x-api-key'];
  try {
    const r = await fetch(`https://api.clickup.com/api/v2/team/${req.params.teamId}/task?statuses[]=open&statuses[]=in+progress&statuses[]=to+do&page=0&limit=50`, {
      headers: { Authorization: apiKey }
    });
    const data = await r.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.json(data);
  } catch(e) {
    res.json({ err: e.message });
  }
});

app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy running'));
