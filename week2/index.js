const express = require("express");
const path = require("path"); // needed for functions having to do with file

const app = express();
const port = process.env.PORT || "8888";

//Setting for Express app
//setting for views is set to path: __dirname/views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Set up folder for static files (e.g. CSS, client-side JS, images)
app.use(express.static(path.join(__dirname, "public")));

//SET UP PAGE ROUTE
app.get("/", (request, response) => {
  //response.status(200).send("Test");
  response.render("index", { title: "Home" });
});

app.get("/about", (request, response) => {
  response.render("about", { title: "About" });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
