require("dotenv").config();
const express = require("express");
const path = require("path");
const {
  connectDB,
  getAllCryptos,
  getCryptoById,
  createCrypto,
  updateCrypto,
  deleteCrypto,
} = require("./modules/crypto/db"); // Adjust the path if needed

// Set up Express app
const app = express();
const port = process.env.PORT || 8888;

// Connect to MongoDB
connectDB();

// Set view engine
app.set("view engine", "pug");

// Post form fields :https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields-in-express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (request, response) => {
  response.render("index");
});

app.get("/about", (request, response) => {
  response.render("about");
});

app.get("/list", async (request, response) => {
  const list = await getAllCryptos();
  response.render("list", { list });
});

app.get("/create", (request, response) => {
  response.render("create");
});

app.post("/create", async (request, response) => {
  await createCrypto(request.body);
  response.redirect("/list");
});

app.get("/edit/:id", async (request, response) => {
  const crypto = await getCryptoById(request.params.id);
  response.render("edit", { crypto });
});

app.post("/edit/:id", async (request, response) => {
  await updateCrypto(request.params.id, request.body);
  response.redirect("/list");
});

app.get("/delete/:id", async (request, response) => {
  const crypto = await getCryptoById(request.params.id);
  response.render("delete", { crypto });
});

app.post("/delete/:id", async (request, response) => {
  await deleteCrypto(request.params.id);
  response.redirect("/list");
});

// Set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
