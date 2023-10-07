
API_KEY = "8KYgOL491yBxAZemH2iWInugS_YdKtmA";

async function getStockData(tickerName) {
fetch(
    "https://api.polygon.io/v3/reference/tickers/" +
    tickerName +
    "?apiKey=" +
    this.API_KEY
)
    .then((response) => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json(); // Parse the response as JSON
    })
    .then((data) => {
    console.log(data); // Handle the JSON data here
    })
    .catch((error) => {
    console.error("Fetch error:", error);
    });
}
