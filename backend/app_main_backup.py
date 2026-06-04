from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import random

# ഈ ലൈനാണ് ഉവികോണിന് വേണ്ടത് (app എന്ന വേരിയബിൾ)
app = FastAPI(title="Data Exhaust Intelligence API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_exhaust_dataframe():
    base_leak_points = [
        ("Device", "IMEI Number", "SDK_BACKGROUND_PING"),
        ("Device", "Battery Level & Temp", "OS_PROPERTY_POLL"),
        ("Location", "GPS Latitude/Longitude", "CORE_LOCATION_SDK"),
        ("Location", "WiFi BSSID & Signal Strength", "NETWORK_SCAN"),
        ("Network", "Carrier Name & IP Address", "SOCKET_PROBE"),
        ("Ad Identifiers", "IDFA / GAID Token", "AD_REQUEST_SEQUENCE"),
        ("Biometrics", "Touch Pressure & Surface Area", "UI_EVENT_LOOP")
    ]
    records = []
    for i in range(55):
        cat, field, vector = base_leak_points[i % len(base_leak_points)]
        records.append({
            "field_id": f"EXH-{i+1:02d}",
            "field_name": f"{field} [Shard {i//len(base_leak_points)}]",
            "category": cat.lower().replace(' ', '_'),
            "source_type": vector,
            "destination_partner": random.choice(["TradeDesk SSP", "LiveRamp Identity Graph", "GDELT OpenStream", "CFPB Feed"])
        })
    return pd.DataFrame(records)

@app.get("/api/exhaust-data")
def get_exhaust_data():
    df = generate_exhaust_dataframe()
    return df.to_dict(orient="records")