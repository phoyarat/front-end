const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// ใช้เป็นฐานข้อมูลชั่วคราว
let users = [];
let nextId = 1;

// อนุญาตให้ Vue (5173) Fetch มาได้
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use(bodyParser.json());

// -------------------------------------------------------
// 1) GET users ทั้งหมด
// -------------------------------------------------------
app.get('/users', (req, res) => {
  res.json(users);
});

// -------------------------------------------------------
// 2) GET user ตาม id
// -------------------------------------------------------
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// -------------------------------------------------------
// 3) สมัครสมาชิก
// -------------------------------------------------------
app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
  }

  const newUser = { id: nextId++, username, password, email };
  users.push(newUser);

  console.log('Users:', users);
  res.status(200).json({ message: 'สมัครสมาชิกสำเร็จ!' });
});

// -------------------------------------------------------
// 4) อัปเดตข้อมูลทั้งหมด ด้วย PUT
// -------------------------------------------------------
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body
  };

  res.json({ message: 'User updated successfully', user: users[userIndex] });
});

// -------------------------------------------------------
// 5) อัปเดตบางส่วนด้วย PATCH
// -------------------------------------------------------
app.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const data = req.body;

  if (data.username !== undefined) users[userIndex].username = data.username;
  if (data.password !== undefined) users[userIndex].password = data.password;
  if (data.email !== undefined) users[userIndex].email = data.email;

  res.json({ message: 'User updated successfully', user: users[userIndex] });
});

// -------------------------------------------------------
// 6) DELETE ลบ user
// -------------------------------------------------------
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json({ message: 'User deleted successfully', user: deletedUser });
});

// -------------------------------------------------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
