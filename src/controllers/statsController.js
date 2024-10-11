const Crypto = require("../models/Crypto");

exports.getStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !["bitcoin", "ethereum", "matic-network"].includes(coin)) {
    return res.status(400).json({ error: "Invalid or missing coin parameter" });
  }

  try {
    const latestEntry = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestEntry) {
      return res.status(404).json({ error: "No data found for this coin" });
    }

    res.json({
      price: latestEntry.price,
      marketCap: latestEntry.marketCap,
      "24hChange": latestEntry.change24h,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
