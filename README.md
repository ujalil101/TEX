# TEX
Welcome to Traveler's Employee Xplorer. This is a MERN application that allows employees to search an enterprise-wide employee directory. It also allows employees to predict salary given job location and job role.

## Navigation 
1. /data: Generates the data.
2. /data_analysis: Contains the model.
3. /mongo: Contains instructions on how to store the fake generated data into MongoDB.
4. /react: Contains the frontend application.
5. /server: Contains the backend logic.

## Quick Setup
1. Generate the data:
```
cd data
python generate_data.py
```
2. Import the generated data into MongoDB by following the instructions in the /mongo directory.
3. Start the flask server
```
cd python
python app.py
```
4. Start the express server
```
cd server
npm install
npm run start
```
5. Start react app
```
cd react
npm install
npm run dev
```

