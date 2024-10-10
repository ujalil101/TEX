from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  

with open('new_model.pkl', 'rb') as file:
    model = pickle.load(file)

training_data = pd.read_csv('emp.csv')
X = pd.get_dummies(training_data[['jobRole', 'workLocation']])
columns = X.columns

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        job_role = data['jobRole']
        location = data['location']
        
        input_df = pd.DataFrame([[job_role, location]], columns=['jobRole', 'workLocation'])
        input_data = pd.get_dummies(input_df)
        input_data = input_data.reindex(columns=columns, fill_value=0)
        predicted_salary = model.predict(input_data)[0]
        
        return jsonify({'predictedSalary': predicted_salary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
