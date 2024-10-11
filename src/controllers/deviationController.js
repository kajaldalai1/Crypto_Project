const Crypto = require("../models/Crypto");

const calculateStandardDeviation = (data) => {
  const n = data.length;
  const mean = data.reduce((acc, val) => acc + val, 0) / n;
  const variance =
    data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
  return parseFloat(Math.sqrt(variance).toFixed(2));
};

exports.getDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !["bitcoin", "ethereum", "matic-network"].includes(coin)) {
    return res.status(400).json({ error: "Invalid or missing coin parameter" });
  }

  try {
    const entries = await Crypto.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (entries.length === 0) {
      return res.status(404).json({ error: "No data found for this coin" });
    }

    const prices = entries.map((entry) => entry.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
