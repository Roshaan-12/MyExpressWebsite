const express = require("express");
const mongoose = require("mongoose");
const server = express();

// Models
const FoodItem = require("./models/FoodItems");

// Routes
const foodSiteRoute = require("./routes/site/foodItems");
const adminSiteRoute = require("./routes/site/admin");
// Middleware
server.use(express.json());
server.use(express.urlencoded());
server.set("view engine","ejs");
server.use(express.static("public"));

// Routes
server.use("/", foodSiteRoute);
server.use("/", adminSiteRoute);

// Homepage Route
server.get("/landingPage", async (req, res) => {
    try {
        // Fetch menu items from the database
        const menuItems = await FoodItem.find();

        // Group items by category
        const groupedMenuItems = {};
        menuItems.forEach(item => {
            if (!groupedMenuItems[item.category]) {
                groupedMenuItems[item.category] = [];
            }
            groupedMenuItems[item.category].push(item);
        });

        // Render the EJS template and pass groupedMenuItems to it
        res.render("landpage", { menuItems: groupedMenuItems });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// Database Connection
mongoose.connect("mongodb://localhost:27017/fa21-bcs-b", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });

// Server Listening
server.listen(3000, () => {
  console.log(`Server started at localhost: 3000`);
});
