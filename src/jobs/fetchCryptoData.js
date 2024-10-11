const cron = require("node-cron");
const Crypto = require("../models/Crypto");
const { fetchCryptoData } = require("../services/cryptoService");

const storeCryptoData = async () => {
  try {
    const cryptoData = await fetchCryptoData();
    const timestamp = new Date();

    const cryptoEntries = Object.entries(cryptoData).map(([coin, data]) => ({
      coin,
      price: data.usd,
      marketCap: data.usd_market_cap,
      change24h: data.usd_24h_change,
      timestamp,
    }));

    await Crypto.insertMany(cryptoEntries);
    console.log(`[${timestamp.toISOString()}] Crypto data fetched and stored.`);
  } catch (error) {
    console.error("Error storing crypto data:", error);
  }
};

// Schedule the job to run every 2 hours
cron.schedule("0 */2 * * *", storeCryptoData);

module.exports = storeCryptoData;
