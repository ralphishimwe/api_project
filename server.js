require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;


const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.use(express.static(path.join(__dirname)));

app.get('/api/codes', async (req, res) => {
  const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch codes" });
  }
});

app.get('/api/rates/:currency', async (req, res) => {
  const baseCurrency = req.params.currency;
  const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${baseCurrency}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch rates" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
