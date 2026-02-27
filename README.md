# Marketing Intelligence Dashboard

This project consists of a FastAPI backend and a React (Vite) frontend.

## Prerequisites

- Python 3.8+
- Node.js (v18+)
- npm

## How to Run

### 1. Backend (FastAPI)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   python -m uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`.

### 2. Frontend (React + Vite)

1. Navigate to the `ui` directory:
   ```bash
   cd ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Data

The project uses `processed_marketing_data.csv` for analytics. This file should be located in the `backend` directory.

## Verification

You can verify the API is running by executing the `verify_api.py` script:
```bash
python backend/verify_api.py
```
