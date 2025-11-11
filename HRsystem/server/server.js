
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(bodyParser.json());


const users = [];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
  }
  const newUser = { username, password, email };
  users.push(newUser);
  console.log('Current users:', users);
  res.status(200).json({ message: 'สมัครสมาชิกสำเร็จ!' });
});

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ทำงานที่ http://localhost:${port}/`);
});
