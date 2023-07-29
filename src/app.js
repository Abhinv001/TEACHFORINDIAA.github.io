const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Registration = require("./models/registeration"); // Correct the file name here
// ... Other require statements and configurations

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/registration", (req, res) => {
  res.render("registration");
});

app.post("/registration", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password == cpassword) {
      const volunteersregisteration = new Registration({
        name: req.body.name,
        password: req.body.password,
        cpassword: req.body.cpassword,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location,
        language: req.body.language,
        available: req.body.week,
      });

      const registration = await volunteersregisteration.save();
      res.status(201).render("index");
    } else {
      res.send("Some thing went wrong"); // Corrected the response message
    }
  } catch (error) {
    res.status(400).send(error); // Corrected the variable name "error"
  }
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.post("/admin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Registration.findOne({ email: email }); // Corrected the variable name "email"

    if (useremail.password == password) {
      res.status(201).render("dashboard");
    } else {
      res.send("Some thing went wrong"); // Corrected the response message
    }
  } catch (error) {
    res.status(400).send(error); // Corrected the variable name "error"
  } 
});

app.get("/dashboard", async (req, res) => {
  try {
    const registration = await Registration.find({}); // Fetch all registrations
    res.render("dashboard", { registrations }); // Pass registrations data to the dashboard view
  } catch (error) {
    res.status(500).send("Server error"); // Corrected the response message
  }
});

app.listen(port, () => {
  console.log("Server is running at port no " + port);
});
