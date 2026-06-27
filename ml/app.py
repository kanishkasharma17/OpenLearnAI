from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load("models/recommendation_model.pkl")
print("\nExpected Features:")
print(model.feature_names_in_)
feature_encoders = joblib.load("models/feature_encoders.pkl")
target_encoder = joblib.load("models/target_encoder.pkl")

FEATURE_COLUMNS = [
    "preferred_domain",
    "courses_enrolled",
    "lessons_completed",
    "completion_rate",
    "quiz_attempts",
    "average_quiz_score",
    "total_study_time",
    "weekly_sessions",
    "learning_streak",
    "preferred_difficulty",
    "risk_level"
]

@app.route("/")
def home():
    return {
        "message": "OpenLearnAI ML Service Running"
    }

@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.json

        row = {}

        for feature in FEATURE_COLUMNS:
            if feature not in data:
                return jsonify({
                    "error": f"Missing feature: {feature}"
                }), 400
            row[feature] = data[feature]

        df = pd.DataFrame([row])

        for column, encoder in feature_encoders.items():
            df[column] = encoder.transform(df[column])
        print("\nReceived Features:")
        print(df.columns.tolist())
        print(df)
        prediction = model.predict(df)

        recommended_course = target_encoder.inverse_transform(prediction)

        return jsonify({
            "recommended_course": recommended_course[0]
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )

