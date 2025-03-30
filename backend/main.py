import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

tt_model = joblib.load('./model/model_pipeline.pkl')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input data schema using Pydantic
class PredictionRequest(BaseModel):
    author: str
    difficulty: int
    category: str
    event_points: int


@app.post("/predict")
async def predict(request: PredictionRequest):
    # Convert input to DataFrame
    input_data = pd.DataFrame([dict(request)])

    # Generate prediction
    prediction = tt_model.predict(input_data)
    return {"predicted_users_solved": int(np.round(prediction[0]))}


# For local testing
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8080)