const mongoose = require("mongoose");

// Connect to MongoDB
async function connectDB() {
  const url = process.env.MONGODB_URL;
  if (!url) {
    throw new Error("The URL is invalid");
  }
  await mongoose.connect(url);
}

// Mongoose schema and model
const cryptoSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
  change_24h: Number,
  volume_24h: Number,
  market_cap: Number,
  description: String,
  icon_url: String,
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

// CRUD operations
async function getAllCryptos() {
  return await Crypto.find();
}

async function getCryptoById(id) {
  return await Crypto.findById(id);
}

async function createCrypto(data) {
  const newCrypto = new Crypto(data);
  return await newCrypto.save();
}

async function updateCrypto(id, data) {
  return await Crypto.findByIdAndUpdate(id, data, { new: true });
}

async function deleteCrypto(id) {
  return await Crypto.findByIdAndDelete(id);
}

module.exports = {
  connectDB,
  getAllCryptos,
  getCryptoById,
  createCrypto,
  updateCrypto,
  deleteCrypto,
};
