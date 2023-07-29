// routes/api.js

const express = require('express');
const router = express.Router();
const Registration = require('../models/registration'); // Assuming you have this model
const Admin = require('../models/admin'); // Require the Admin model

// Fetch all registrations
router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find({});
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post("/admin", async (req, res) => {
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
// Admin login authentication
// router.post('/admin/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the admin in the database based on the provided email
//     const admin = await Admin.findOne({ email });

//     // If the admin is found and the password matches, authentication is successful
//     if (admin && admin.password === password) {
//       res.json({ message: 'Admin authenticated successfully' });
//     } else {
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

module.exports = router;

