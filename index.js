const request = require('request');

// Salesforce認証情報
const consumerKey = env.consumerKey;
const consumerSecret = env.consumerSecret;
const username = env.username;
const password = env.passoword;

// Salesforce OAuthエンドポイント
const tokenRequestUrl = 'https://login.salesforce.com/services/oauth2/token';

// Salesforceからアクセストークンを取得
function getSalesforceAccessToken(callback) {
  request.post({
    url: tokenRequestUrl,
    form: {
      grant_type: 'password',
      client_id: consumerKey,
      client_secret: consumerSecret,
      username: username,
      password: password
    }
  }, callback);
}

// アクセストークンを使用してSalesforceのAPIにレコード更新リクエストを送信
function updateSalesforceRecord(accessToken, updateData, callback) {
  const salesforceEndpoint = 'https://あなたのSalesforceインスタンスのURL/services/apexrest/RecordUpdate/';

  request.post({
    url: salesforceEndpoint,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    json: true,
    body: updateData
  }, callback);
}

// 例: アクセストークンを取得してからレコードを更新
getSalesforceAccessToken((error, response, body) => {
  if (error) {
    console.error('Error getting access token:', error);
    return;
  }

  const accessToken = JSON.parse(body).access_token;
  const updateData = { /* ここに更新データを設定 */ };

  updateSalesforceRecord(accessToken, updateData, (error, response, body) => {
    if (error) {
      console.error('Error updating Salesforce record:', error);
      return;
    }

    console.log('Record updated:', body);
  });
});
