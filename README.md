<div align="center">

# 🅿 PredictDasha

### AI-Powered Marketing Intelligence Dashboard

*Transform your marketing data into actionable insights with real-time KPI tracking, predictive forecasting, and anomaly detection.*

[![Python](https://img.shields.io/badge/Python-3.8%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-fastapi)
  - [Frontend Setup](#2-frontend-react--vite)
- [Data](#-data)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

---

## 🚀 Overview

**PredictDasha** is a full-stack, AI-powered marketing intelligence platform built for data-driven teams. It ingests real marketing campaign data, runs machine learning models in the backend, and surfaces beautiful, interactive dashboards on the frontend.

Designed as a demonstration of end-to-end data engineering and ML integration, PredictDasha covers the complete pipeline — from raw CSV ingestion and preprocessing (via Jupyter) to RESTful API exposure and a modern React UI.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **KPI Dashboard** | Real-time overview of core marketing metrics — revenue, conversions, CTR, and ROI |
| 📈 **Revenue Forecasting** | 30-day revenue projections using Facebook Prophet time-series model |
| 🎯 **Campaign Analytics** | Breakdown of campaign performance by channel, spend, and conversion rates |
| 🚨 **Anomaly Detection** | Automatic detection of statistical outliers in campaign data using scikit-learn |
| 🔮 **Predictive Insights** | ML-driven insights powered by `statsmodels` and `scikit-learn` |
| 📁 **CSV-Backed Data Layer** | Real marketing dataset (~40MB) loaded and processed via `pandas` |

---

## 🛠 Tech Stack

### Backend
- **[FastAPI](https://fastapi.tiangolo.com/)** — High-performance REST API framework
- **[Uvicorn](https://www.uvicorn.org/)** — ASGI server for FastAPI
- **[Pandas](https://pandas.pydata.org/)** / **[NumPy](https://numpy.org/)** — Data loading, transformation, and aggregation
- **[scikit-learn](https://scikit-learn.org/)** — Machine learning models for anomaly detection and prediction
- **[Prophet](https://facebook.github.io/prophet/)** — Time-series forecasting for revenue projection
- **[statsmodels](https://www.statsmodels.org/)** — Statistical modelling and analysis
- **[Pydantic](https://docs.pydantic.dev/)** — Data validation and serialisation

### Frontend
- **[React 19](https://react.dev/)** + **[Vite 7](https://vite.dev/)** — Modern SPA with lightning-fast HMR
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling
- **[Recharts](https://recharts.org/)** — Declarative charting library for React
- **[React Router DOM 7](https://reactrouter.com/)** — Client-side routing
- **[Axios](https://axios-http.com/)** — HTTP client for API communication
- **[Lucide React](https://lucide.dev/)** — Icon system

### Data & ML
- **Jupyter Notebook** — Data exploration and preprocessing pipeline (`Marketing_KPI_Data_Preprocessing.ipynb`)
- **CSV Dataset** — Real marketing campaign data (~27MB raw, ~40MB processed)

---

## 📁 Project Structure

```
PredictDasha/
│
├── 📓 Marketing_KPI_Data_Preprocessing.ipynb   # Data exploration & preprocessing
├── 📄 marketing_campaign_dataset.csv           # Raw marketing data (~27MB)
├── 📄 processed_marketing_data.csv             # Cleaned & enriched data (~40MB)
├── 📄 revenue_forecast_30_days.csv             # Pre-computed 30-day forecast
│
├── 🐍 backend/                                 # FastAPI application
│   ├── main.py                                 # App entry point & CORS config
│   ├── requirements.txt                        # Python dependencies
│   ├── api/
│   │   └── endpoints.py                        # All REST API route definitions
│   ├── services/
│   │   ├── data_service.py                     # Core data processing & ML logic
│   │   └── mock_data.py                        # Fallback mock data
│   └── models/                                 # Pydantic response models
│
└── ⚛️  ui/                                     # React + Vite frontend
    ├── index.html
    ├── package.json
    └── src/
        ├── App.jsx                             # Root component & routing
        ├── pages/
        │   ├── Dashboard.jsx                   # KPI overview page
        │   ├── CampaignAnalytics.jsx           # Campaign performance page
        │   ├── Forecasting.jsx                 # Revenue forecasting page
        │   ├── RevenueForecasting.jsx          # Detailed revenue charts
        │   └── Anomalies.jsx                   # Anomaly detection page
        ├── components/
        │   ├── dashboard/                      # KPI cards, metric widgets
        │   ├── campaigns/                      # Campaign tables & charts
        │   ├── forecasting/                    # Forecast visualisations
        │   └── layout/                         # Sidebar, navbar, shell
        └── services/
            └── api.js                          # Axios API client
```

---

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Python 3.8+** — [Download](https://www.python.org/downloads/)
- **Node.js v18+** — [Download](https://nodejs.org/en/download)
- **npm** (bundled with Node.js)
- **Git** — [Download](https://git-scm.com/)

> **Note:** The `Prophet` library may require additional system dependencies. See the [Prophet installation guide](https://facebook.github.io/prophet/docs/installation.html) if you encounter issues.

---

### 1. Backend (FastAPI)

```bash
# Navigate to the backend directory
cd backend

# (Recommended) Create and activate a virtual environment
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS / Linux
source venv/bin/activate

# Install all Python dependencies
pip install -r requirements.txt

# Start the development server
python -m uvicorn main:app --reload
```

The API will be live at **`http://localhost:8000`**

> Interactive API docs are auto-generated at **`http://localhost:8000/docs`** (Swagger UI)

---

### 2. Frontend (React + Vite)

Open a **new terminal** and run:

```bash
# Navigate to the UI directory
cd ui

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

The dashboard will be available at **`http://localhost:5173`**

---

### ✅ Verify the Setup

You can confirm the backend API is running correctly:

```bash
python backend/verify_api.py
```

---

## 📊 Data

PredictDasha uses a real marketing campaign dataset. Ensure the following files are present before starting:

| File | Location | Description |
|---|---|---|
| `marketing_campaign_dataset.csv` | `./` | Raw input data (~27MB) |
| `processed_marketing_data.csv` | `./backend/` | Pre-processed data used by API (~40MB) |
| `revenue_forecast_30_days.csv` | `./` | Pre-computed 30-day revenue forecast |

> **Tip:** Run the Jupyter notebook `Marketing_KPI_Data_Preprocessing.ipynb` to regenerate the processed data from the raw CSV.

---

## 🔌 API Reference

The backend exposes a REST API under the `/api` prefix. Key endpoints include:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/api/kpis` | Summary KPI metrics |
| `GET` | `/api/campaigns` | Campaign performance data |
| `GET` | `/api/forecast` | 30-day revenue forecast |
| `GET` | `/api/anomalies` | Detected anomalies |

> Full interactive documentation: **`http://localhost:8000/docs`**

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request**

Please follow conventional commit messages and ensure any new backend routes are documented.

---

<div align="center">

Built with ❤️ by **Lavanya Borse**

</div>
