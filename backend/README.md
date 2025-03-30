
# picoCTF Solves Predictor - Backend

## Overview

The backend component of the picoCTF Solves Predictor provides the data collection, preprocessing, model training, and inference API for predicting the number of users who will solve a given picoCTF challenge. This system uses machine learning to analyze challenge characteristics and generate accurate solve count predictions.

## Architecture

The backend consists of four main components:

1. **Data Collection** - Web scraping script to gather challenge data from picoCTF
2. **Data Preprocessing** - Transformation and feature engineering pipeline
3. **Model Training** - Machine learning model development and evaluation
4. **Inference API** - RESTful API for serving predictions to the frontend

## Technologies

- **Python 3.8+** - Core programming language
- **FastAPI** - High-performance API framework
- **pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **scikit-learn** - Machine learning utilities
- **CatBoost** - Gradient boosting algorithm
- **Selenium/undetected-chromedriver** - Web scraping
- **Jupyter Notebooks** - Data analysis and model development
- **joblib** - Model serialization

## Components

### 1. Data Collection

The data collection component uses a web scraping script to gather challenge data from the picoCTF website.

**Key files:**
- `scraping-script/scrap.py`

**Features:**
- Uses undetected_chromedriver to bypass anti-bot measures
- Handles authentication via cookies
- Navigates through API pagination
- Extracts challenge attributes (name, author, difficulty, category, etc.)
- Exports data to time-stamped CSV files

**Usage:**
```bash
cd scraping-script
python scrap.py
```

### 2. Data Preprocessing

The data preprocessing component transforms raw challenge data into a format suitable for machine learning.

**Key files:**
- `data-preprocessing/data-preprocess.ipynb`
- `data-preprocessing/data_filtered.csv`

**Features:**
- Feature selection and engineering
- Categorical encoding (especially for challenge authors)
- Data cleaning and normalization
- Feature correlation analysis
- Train/test splitting

### 3. Model Training

The model training component develops and evaluates machine learning models to predict challenge solve counts.

**Key files:**
- `model/model.ipynb`
- `model/model_pipeline.pkl`

**Features:**
- Implements CatBoost algorithm for gradient boosting
- Hyperparameter tuning and cross-validation
- Model evaluation and performance metrics
- Feature importance analysis
- Model serialization for deployment

**Why CatBoost:**
CatBoost was selected after comparison with other algorithms (Random Forest, XGBoost, LightGBM) due to:
- Superior handling of categorical features without extensive preprocessing
- Better performance with the small-to-medium sized dataset
- Robust against overfitting through its ordered boosting approach
- Excellent prediction accuracy for this regression task
- Built-in feature importance for model interpretability

### 4. Inference API

The inference API component serves model predictions to the frontend application.

**Key files:**
- `main.py`

**Features:**
- FastAPI-based RESTful API
- Loads serialized model pipeline
- Input validation through Pydantic models
- CORS configuration for frontend access
- Containerization-ready design

**API Endpoints:**
- `POST /predict` - Accepts challenge attributes and returns predicted solve count

**Request Format:**
```json
{
  "author": "string",
  "difficulty": "integer",
  "category": "string",
  "event_points": "integer"
}
```

**Response Format:**
```json
{
  "predicted_users_solved": "integer"
}
```

## Setup and Installation

### Prerequisites
- Python 3.8+
- Chrome browser (for scraping)
- Virtual environment tool (recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yvesHakizimana/picoCTF-solves-predictor.git
   cd picoCTF-solves-predictor/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the API

Start the FastAPI server:
```bash
python main.py
```

The API will be available at http://localhost:8080.

For development with auto-reload:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

## Data Workflow

1. **Collect Data**: Run the scraping script to gather challenge data
2. **Preprocess Data**: Execute the preprocessing notebook to clean and transform data
3. **Train Model**: Run the model training notebook to develop and save the prediction model
4. **Deploy API**: Start the FastAPI server to serve predictions

## Project Structure

```
backend/
├── data/                      # Data storage
├── data-preprocessing/        # Data preprocessing scripts
│   ├── data-preprocess.ipynb  # Preprocessing notebook
│   └── data_filtered.csv      # Processed dataset
├── model/                     # Model training and storage
│   ├── model.ipynb            # Model development notebook
│   └── model_pipeline.pkl     # Serialized model pipeline
├── scraping-script/           # Data collection
│   └── scrap.py               # Web scraping script
├── main.py                    # FastAPI application
└── requirements.txt           # Python dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`pip install -r requirements.txt`)
4. Make your changes
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the Rwanda Coding Academy License.
