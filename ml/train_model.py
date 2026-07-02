import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

df=pd.read_csv("data/synthetic_students.csv")

#  REMOVE COLUMNS THAT SHOULDN'T BE  USED 
X = df.drop(
    columns=[
        "student_id",
        "profile",
        "recommended_course"
    ]
)
print(X.columns.tolist())

y = df["recommended_course"]

# CONVERT STRINGS LIKE DSA , PROGRAMMING etc  TO NUMBERS 
encoders = {}

for column in X.select_dtypes(include=["object","string"]).columns:

    encoder = LabelEncoder()

    X[column] = encoder.fit_transform(X[column])

    encoders[column] = encoder


# ENCODE TARGET
target_encoder = LabelEncoder()
y = target_encoder.fit_transform(y)


# TRAIN AND TEST DATASET SPLIT
X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,
random_state=42
)

# TRAIN MODEL 

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)
model.fit(
    X_train,
    y_train
)

#EVALUATE
predictions = model.predict(X_test)
accuracy = accuracy_score(
    y_test,
    predictions
)
print()
print("Accuracy:", accuracy)

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

os.makedirs(MODEL_DIR, exist_ok=True)
print("Current working directory:", os.getcwd())
print("Current file:", __file__)
print("Models directory exists:", os.path.exists("models"))
print("Absolute model path:", os.path.abspath("models"))
joblib.dump(
    model,
    os.path.join(MODEL_DIR, "recommendation_model.pkl")
)

joblib.dump(
    encoders,
    os.path.join(MODEL_DIR, "feature_encoders.pkl")
)

joblib.dump(
    target_encoder,
    os.path.join(MODEL_DIR, "target_encoder.pkl")
)

print("Recommendation model saved.")
