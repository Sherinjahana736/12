import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI(
    title="Data Exhaust Intelligence API",
    description="Generates mobile data exhaust records mapped to CFPB and GDELT partner destinations.",
    version="1.0.0",
)

# Read CORS origins from env var (injected by Docker / .env)
# Falls back to localhost for local development
_raw_origins = os.environ.get(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001"
)
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def generate_exhaust_dataframe() -> pd.DataFrame:
    field_templates = [
        {
            "field_name": "IMEI Number",
            "category": "device_identifier",
            "source_type": "SDK_BACKGROUND_PING",
            "destination_partner": "TradeDesk SSP",
        },
        {
            "field_name": "Battery Level & Temperature",
            "category": "device_health",
            "source_type": "OS_PROPERTY_POLL",
            "destination_partner": "LiveRamp Identity Graph",
        },
        {
            "field_name": "GPS Latitude/Longitude",
            "category": "location_matrix",
            "source_type": "CORE_LOCATION_SDK",
            "destination_partner": "GDELT OpenStream",
        },
        {
            "field_name": "WiFi BSSID & Signal Strength",
            "category": "location_matrix",
            "source_type": "NETWORK_SCAN",
            "destination_partner": "CFPB Feed",
        },
        {
            "field_name": "Carrier Name & IP Address",
            "category": "network_profile",
            "source_type": "SOCKET_PROBE",
            "destination_partner": "TradeDesk SSP",
        },
        {
            "field_name": "IDFA / GAID Token",
            "category": "advertising_id",
            "source_type": "AD_REQUEST_SEQUENCE",
            "destination_partner": "LiveRamp Identity Graph",
        },
        {
            "field_name": "Touch Pressure & Surface Area",
            "category": "biometric_event",
            "source_type": "UI_EVENT_LOOP",
            "destination_partner": "GDELT OpenStream",
        },
        {
            "field_name": "Foreground App Session",
            "category": "app_event",
            "source_type": "USER_INTERACTION_LOG",
            "destination_partner": "CFPB Feed",
        },
    ]



    source_map = {
        "SDK_BACKGROUND_PING": "TradeDesk SSP",
        "OS_PROPERTY_POLL": "LiveRamp Identity Graph",
        "CORE_LOCATION_SDK": "GDELT OpenStream",
        "NETWORK_SCAN": "CFPB Feed",
        "SOCKET_PROBE": "TradeDesk SSP",
        "AD_REQUEST_SEQUENCE": "LiveRamp Identity Graph",
        "UI_EVENT_LOOP": "GDELT OpenStream",
        "USER_INTERACTION_LOG": "CFPB Feed",
    }

    records = []
    for index in range(55):
        template = field_templates[index % len(field_templates)].copy()
        template["field_id"] = f"EXH-{index + 1:02d}"
        template["field_name"] = f"{template['field_name']} [Record {index + 1}]"
        template["destination_partner"] = source_map[template["source_type"]]
        records.append(template)

    df = pd.DataFrame(records, columns=[
        "field_id",
        "field_name",
        "category",
        "source_type",
        "destination_partner",
    ])
    return df


@app.get("/")
def root():
    return {"status": "ok", "message": "Data Exhaust Intelligence API is running. Visit /docs for the API reference or /api/exhaust-data for data."}


@app.get("/api/exhaust-data")
def get_exhaust_data():
    df = generate_exhaust_dataframe()
    return df.to_dict(orient="records")
