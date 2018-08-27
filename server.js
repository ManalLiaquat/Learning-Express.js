const express = require("express");
const hbs = require("hbs"); // hbs = handlebars
const fs = require("fs");

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
// for getting dynamic files
app.set("view engine", "hbs");

// for getting static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", `${log}\n`, err => {
    if (err) console.log(err);
  });
  next();
});

/* A Middleware */
// app.use((req, res, next) => {
//   res.render("maintenance.hbs", {
//     pageTitle: "Maintenance Page"
//   });
// });

hbs.registerHelper("getYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

// server requests
app.get("/", (req, res) => {
  //   res.send("<h1>Hello World!</h1>");
  //   res.send({
  //     name: "manal",
  //     age: 21
  //   });
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to our website"
  });
});

app.get("/about", (req, res) => {
  //   res.send("<center>Welcome to about page</center>");
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to get your request!"
  });
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
