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
    const query = req.query.name;
    try {
      let employees;
      if (query) {
        employees = await db.collection(collectionName).find({ name: query }).toArray();
      } else {
        employees = await db.collection(collectionName).find().toArray();
      }
      res.json(employees);
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.collection(collectionName).findOne({ username, password });
        if (user) {
            res.status(200).json({ uid: user._id });
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


