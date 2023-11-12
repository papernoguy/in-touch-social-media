
API_KEY = "?apiKey=8KYgOL491yBxAZemH2iWInugS_YdKtmA";
API_URL = "https://api.polygon.io/v3/reference/tickers/"


async function getStockData(tickerName) {
    return await fetch(this.API_URL +
        tickerName +
        this.API_KEY).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Use the appropriate method based on the content type
            return response.json(); // Use response.text() for non-JSON data
        })
        .then(data => {
            // Handle the response data
            return data.results.description
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

module.exports = {
    getStockData
};