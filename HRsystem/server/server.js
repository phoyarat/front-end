import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';

// -------------------------------------------
// Setup
// -------------------------------------------
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------------------------------
// Multer Upload
// -------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use(bodyParser.json());

// -------------------------------------------
// Connect MySQL Database
// -------------------------------------------
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database'
});

db.connect(err => {
  if (err) {
    console.error('DB connect error:', err);
    return;
  }
  console.log('MySQL Connected successfully');
});

// -------------------------------------------
// API Routes
// -------------------------------------------

// Get all users
app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get user by id
app.get('/users/:id', (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(results[0]);
  });
});

// SIGNUP user
app.post('/signup', upload.single('avatar'), async (req, res) => {
  const { fname, lname, username, password, role } = req.body;
  const avatar = req.file?.filename || null;

  if (!fname || !lname || !username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (fname, lname, username, password, avatar, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [fname, lname, username, hashedPassword, avatar, role], err => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Username already exists' });
      }
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Signup successful' });
  });
});   
app.put('/users/:id', (req, res) => {
  const { fname, lname, username } = req.body;
  const { id } = req.params;

  db.query(
    'UPDATE users SET fname = ?, lname = ?, username = ? WHERE id = ?',
    [fname, lname, username, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User updated successfully' });
    }
  );
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User deleted successfully' });
  });
});


// -------------------------------------------
// Start Server
// -------------------------------------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
