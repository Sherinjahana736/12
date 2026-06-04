import unittest
import urllib.request
import json
import pandas as pd
from main import generate_exhaust_dataframe

class TestDataExhaustBackend(unittest.TestCase):
    def test_dataframe_generation(self):
        """Test that the DataFrame generation generates exactly 55 records with correct columns."""
        df = generate_exhaust_dataframe()
        self.assertIsInstance(df, pd.DataFrame)
        self.assertEqual(len(df), 55)
        expected_columns = [
            "field_id",
            "field_name",
            "category",
            "source_type",
            "destination_partner",
        ]
        self.assertEqual(list(df.columns), expected_columns)

    def test_live_api_endpoint(self):
        """Test that the live running FastAPI endpoint is responsive and returns valid data."""
        url = "http://127.0.0.1:8000/api/exhaust-data"
        try:
            with urllib.request.urlopen(url) as response:
                self.assertEqual(response.status, 200)
                data = json.loads(response.read().decode())
                self.assertEqual(len(data), 55)
                
                # Check structure of the first item
                first_item = data[0]
                self.assertIn("field_id", first_item)
                self.assertIn("field_name", first_item)
                self.assertIn("category", first_item)
                self.assertIn("source_type", first_item)
                self.assertIn("destination_partner", first_item)
        except Exception as e:
            self.fail(f"Could not connect to the live API at {url}. Error: {e}")

if __name__ == "__main__":
    unittest.main()
