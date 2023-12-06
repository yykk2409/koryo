// Expressを使用した例
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { readFileSync } = require("fs");

// サンプルのユーザーデータベース
const users = [
  { username: 'Koryo2024', password: 'Kinoetatu' },
];

app.use(bodyParser.json());
app.get('/', (req, resp) => {
    resp.status(200).send(readFileSync("./koryo_login.html", {encoding: "utf-8"}));
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // ユーザーの認証
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    // ログイン成功時の処理（トークンの発行など）
    const token = generateToken(); // トークン生成の関数
    res.json({ token });
  } else {
    res.status(401).json({ error: '認証失敗' });
  }
});
function generateToken() {
  const tokenLength = 20; // トークンの長さ
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 使用する文字列

  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
}

// サーバーを起動
app.listen(3000, () => {
  console.log('サーバーがポート3000で起動しました');
});
