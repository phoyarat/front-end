const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
let users = []
let nextId = 1;


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use(bodyParser.json());


app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
  }
  const newUser = { id:nextId++,username, password, email };
  users.push(newUser);
  console.log('Current users:', users);
  res.status(200).json({ message: 'สมัครสมาชิกสำเร็จ!' });
});

app.put('/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // อัปเดตเฉพาะ field ที่มีใน body
  users[userIndex] = {
    ...users[userIndex],
    ...req.body
  };

  res.json({ message: 'User updated successfully', user: users[userIndex] });
});


app.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // ใช้ id ให้ตรงกับชื่อ param
  const data = req.body;
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // อัปเดตเฉพาะ field ที่ส่งมา
  if (data.username !== undefined) {
    users[userIndex].username = data.username;
  }
  if (data.password !== undefined) {
    users[userIndex].password = data.password;
  }
  if (data.email !== undefined) {
    users[userIndex].email = data.email;
  }

  res.json({ message: 'User updated successfully', user: users[userIndex] });
});

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ทำงานที่ http://localhost:${port}/`);
});