import time
import requests

# List of tokens (to be used as zone IDs)
TOKENS = [
    "6737278e28aebf267e089bec", "67372c1c7a5c6e90024299e1", "67372c23ea45b856683249f4", "67372c2a2219842167aa3e0c", "67372c31f895d5d1b4d6c2a9",
    "67372c39c499cd12be6bef9e", "67372c44db061db993104ce1", "67372c4a591a6cbabccfc012", "6710c41ed814fc8dae914171", "67372c56ec018d7dedd34ee3",
    "67372c61f269e28d2f86f063", "67372c686fa2f2902a4b7c2a"
]

# Team token
TEAM_TOKEN = "28620274-0860-416a-baee-4ae42f8623fd"

# Base URL for events API
BASE_URL = "https://hackeps-poke-backend.azurewebsites.net/events/"

# Function to send a POST request for an event
def generate_event(zone_id, team_token):
    url = f"{BASE_URL}{zone_id}"
    headers = {"Authorization": f"Bearer {team_token}"}
    body = {"team_id": team_token}

    try:
        response = requests.post(url, json=body, headers=headers)
        print(f"Response Status Code: {response.status_code}")
        print(f"Response Content: {response.text}")
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()  # Return the parsed JSON response
    except requests.exceptions.RequestException as e:
        print(f"Error while generating event for zone_id {zone_id}: {e}")
        return None

# Main function to cycle through tokens and use them as zone IDs
def main():
    while True:
        for token in TOKENS:
            print(f"Using token as zone_id: {token}")
            
            # Generate the event
            result = generate_event(token, TEAM_TOKEN)
            if result:
                print(f"Event generated successfully: {result}")
            else:
                print("Failed to generate event.")

            # Wait for 1 second before trying the next zone_id
            time.sleep(1)

        # Wait for 600 seconds (10 minutes) after all zone IDs are tried
        print("All zone_ids tried. Waiting for 600 seconds...")
        time.sleep(600)

# Run the script
if __name__ == "__main__":
    main()