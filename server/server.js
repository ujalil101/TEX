import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

let db;

MongoClient.connect(url)
  .then(client => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/employees', async (req, res) => {
  const { name } = req.query;
  try {
    let employees;
    if (name) {
      employees = await db.collection(collectionName).find({
        name: { $regex: `^${name}`, $options: 'i' }
      }).toArray();
    } else {
      employees = [];
    }
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.collection(collectionName).findOne({ username, password });
        if (user) {
            const { password, ...userWithoutPassword } = user;
            res.status(200).json(userWithoutPassword);
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


