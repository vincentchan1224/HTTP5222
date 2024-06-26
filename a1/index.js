require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("The URI is valid");
}

mongoose.connect(uri);

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Mongoose schema
const listSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
  change_24h: Number,
  volume_24h: Number,
  market_cap: Number,
  description: String,
  icon_url: String,
});

const Crypto = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/list", async (req, res) => {
  const list = await Crypto.find();
  res.render("list", { list });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  const newCrypto = new Crypto(req.body);
  await newCrypto.save();
  res.redirect("/list");
});

// Edit form
app.get("/edit/:id", async (req, res) => {
  const crypto = await Crypto.findById(req.params.id);
  res.render("edit", { crypto });
});

// Handle the Edit form
app.post("/edit/:id", async (req, res) => {
  await Crypto.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/list");
});

// Delete page
app.get("/delete/:id", async (req, res) => {
  const crypto = await Crypto.findById(req.params.id);
  res.render("delete", { crypto });
});

// Handle the Delete action
app.post("/delete/:id", async (req, res) => {
  await Crypto.findByIdAndDelete(req.params.id);
  res.redirect("/list");
});

app.listen(3000, () => {
  console.log("Server is running.");
});
