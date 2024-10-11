const axios = require("axios");

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

exports.fetchCryptoData = async () => {
  const params = {
    ids: "bitcoin,ethereum,matic-network",
    vs_currencies: "usd",
    include_market_cap: "true",
    include_24hr_change: "true",
  };

  try {
    const response = await axios.get(COINGECKO_API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);
    throw error;
  }
};
