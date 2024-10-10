# Quick Setup
1. Create a Database: Create a database named tex.
2. Create a Collection: Create a collection named directory.
3. Generate Fake Data: Use the generate_data.py script located in the /data directory to generate fake data.
4. Import Data to MongoDB:

`cd monogodb/mongoimport --uri mongodb://localhost:27017/tex --collection directory --file {replace with filename}.json --jsonArray --drop`
