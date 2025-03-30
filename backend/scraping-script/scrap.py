import undetected_chromedriver as uc
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
import time
import json
import csv
from datetime import datetime
from urllib.parse import urlparse, parse_qs


def main():
    # Configure browser options
    options = uc.ChromeOptions()
    options.add_argument("--disable-blink-features=AutomationControlled")

    # Initialize the browser
    driver = uc.Chrome(options=options)

    try:
        # First navigate to set cookies properly
        driver.get("https://play.picoctf.org/")

        # Add your cookies here (replace with actual values)
        cookies = [
            {
                'name': 'sessionid',
                'value': '3cz4jgqm08bwvwgfywz1hyyg5rrsyucq',
                'domain': 'play.picoctf.org'
            },
            {
                'name': 'cf_clearance',
                'value': 'qZ0OXJCI5c6Pfm7Z0kAnIJ92WgECJDSPcoyoxw2ZacM-1743273033-1.2.1.1-9KK.EIuMHJKFgh85TO1.XlM_aRHsyC4L0fnaTIuiZKze7GlC3RBUPp4DPQcc9o7qbVvWYmxrIT1kKi5NytQdlRqxe6R7ZIWqZvjigEbw16Jsz888a8TIg6ENGzSKfhn7M9sKbjSF_8RDx8.IOTUOb2VBasAOqKJQ8sGnZnrIbF_e006bMOPiS_AOyWBqu85Zuy4DGabieEWdp6dtRMTcXjgZgjx_0tNNH1UvAfQpUk7sTM3M7YJBCduCPXgl5Zk1qH_J3bLXsqf6wbUThIj9phYuNGjZqUZtLEzCWT5nNu1.3osbdh_5Ky8UGxeJlmMIYZJINRc3obA_SxWUHoA90n.NNdBzwHO9Db84W6XnTAM',
                'domain': 'play.picoctf.org'
            }
        ]

        for cookie in cookies:
            driver.add_cookie(cookie)

        # Refresh to apply cookies
        driver.refresh()
        time.sleep(2)

        # Initialize variables for pagination
        all_challenges = []
        api_url = "https://play.picoctf.org/api/challenges/?page=1&page_size=12"
        page_count = 0

        while api_url:
            page_count += 1
            print(f"Processing page {page_count}...")

            driver.get(api_url)
            WebDriverWait(driver, 20).until(
                lambda d: d.execute_script("return document.readyState") == "complete"
            )

            if "Just a moment" in driver.page_source:
                print("Cloudflare challenge detected. Try running in non-headless mode.")
                break

            try:
                pre_element = driver.find_element(By.TAG_NAME, "pre")
                data = json.loads(pre_element.text)
                all_challenges.extend(data['results'])

                # Get next page URL from the API response
                next_url = data.get('next')
                if next_url:
                    # Convert to HTTPS if needed
                    api_url = next_url.replace('http://', 'https://')

                    # Add slight delay between requests
                    time.sleep(1)
                else:
                    api_url = None

            except Exception as e:
                print(f"Error processing page {page_count}: {str(e)}")
                break

        # Generate CSV filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"picoctf_all_challenges_{timestamp}.csv"

        # Define CSV structure
        fieldnames = [
            'id', 'name', 'author', 'difficulty', 'event',
            'category', 'tags', 'users_solved', 'event_points',
            'solved_by_user', 'bookmarked'
        ]

        # Write to CSV
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()

            for challenge in all_challenges:
                try:
                    # Handle possible missing event data
                    event_name = challenge['event']['name'] if challenge.get('event') else 'N/A'
                    category_name = challenge['category']['name'] if challenge.get('category') else 'N/A'

                    writer.writerow({
                        'id': challenge.get('id', 'N/A'),
                        'name': challenge.get('name', 'N/A'),
                        'author': challenge.get('author', 'N/A'),
                        'difficulty': challenge.get('difficulty', 'N/A'),
                        'event': event_name,
                        'category': category_name,
                        'tags': ', '.join([tag.get('name', '') for tag in challenge.get('tags', [])]),
                        'users_solved': challenge.get('users_solved', 'N/A'),
                        'event_points': challenge.get('event_points', 'N/A'),
                        'solved_by_user': challenge.get('solved_by_user', 'N/A'),
                        'bookmarked': challenge.get('bookmarked', 'N/A')
                    })
                except Exception as e:
                    print(f"Error processing challenge ID {challenge.get('id', 'unknown')}: {str(e)}")
                    continue
    finally:
        try:
            time.sleep(1)
            driver.quit()
        except:
            pass


if __name__ == "__main__":
    main()