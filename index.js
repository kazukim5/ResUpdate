const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// 環境変数からSalesforceのAPIエンドポイントとAPIキーを取得
const SALESFORCE_ENDPOINT = process.env.SALESFORCE_ENDPOINT;
const API_KEY = process.env.API_KEY;

app.post('/update-record', (req, res) => {
  // リクエストボディから更新データを取得
  const updateData = req.body;

  // SalesforceのApex REST APIにリクエストを送信
  request.post({
    url: SALESFORCE_ENDPOINT,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    json: true,
    body: updateData
  }, (error, response, body) => {
    if (error) {
      return res.status(500).send('Internal Server Error');
    }
    res.status(200).send(body);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

