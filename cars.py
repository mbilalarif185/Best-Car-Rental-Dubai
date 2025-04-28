from bs4 import BeautifulSoup

# Load the XML file
with open("cars.xml", "r", encoding="utf-8") as file:
    xml_data = file.read()

# Parse the XML content
soup = BeautifulSoup(xml_data, "xml")

# Loop through each <item>
for item in soup.find_all("item"):
    # Title
    title = item.find("title").text.strip()

    # Categories (can be more than one)
    categories = [cat.text.strip() for cat in item.find_all("category")]

    # Features (from content:encoded)
    features = []
    content_encoded = item.find("content:encoded")
    if content_encoded:
        content_html = BeautifulSoup(content_encoded.text, "html.parser")
        feature_list = content_html.find_all("li")
        features = [li.get_text(strip=True) for li in feature_list]

    # Output
    print(f"Title: {title}")
    print(f"Categories: {', '.join(categories)}")
    print("Features:")
    for f in features:
        print(f" - {f}")
    print("-" * 50)
