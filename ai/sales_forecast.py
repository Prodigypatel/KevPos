import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Load sales data
def load_sales_data():
    df = pd.read_csv("database/sales_data.csv")
    df["date"] = pd.to_datetime(df["date"])
    df["day_of_week"] = df["date"].dt.dayofweek
    df["month"] = df["date"].dt.month
    return df

# Train AI model
def train_model():
    df = load_sales_data()
    X = df[["day_of_week", "month", "product_id", "quantity_sold"]]
    y = df["quantity_sold"].shift(-1).fillna(df["quantity_sold"].mean())

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    return model

# Predict future sales
def predict_sales(product_id, days_ahead=7):
    model = train_model()
    future_dates = pd.date_range(start=pd.Timestamp.today(), periods=days_ahead)
    predictions = []

    for date in future_dates:
        prediction = model.predict([[date.dayofweek, date.month, product_id, 10]])
        predictions.append((date.strftime("%Y-%m-%d"), int(prediction[0])))

    return predictions

# Example usage
if __name__ == "__main__":
    product_id = 1  # Example Product ID
    forecast = predict_sales(product_id, days_ahead=7)
    print(forecast)
