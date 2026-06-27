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

#SAVE RESULTS
joblib.dump(
    model,
    "models/recommendation_model.pkl"
)

joblib.dump(
    encoders,
    "models/feature_encoders.pkl"
)

joblib.dump(
    target_encoder,
    "models/target_encoder.pkl"
)

print()
print("Recommendation model saved.")

