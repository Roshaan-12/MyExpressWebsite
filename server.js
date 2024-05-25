const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const server = express();

// Models
const FoodItem = require("./models/FoodItems");

server.use(expressLayouts);

// Routes
const foodSiteRoute = require("./routes/site/foodItems");
const adminSiteRoute = require("./routes/site/admin");
const chefSiteRoute = require("./routes/site/chefs");

// Middlewares
const skipAuthForRoutes = require('./middlewares/skipAuthForRoutes');

// Middleware setup
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.set("view engine", "ejs");

// Session setup
server.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/fa21-bcs-b' })
}));

// Homepage Route
server.get("/landingPage", async (req, res) => {
    try {
        const menuItems = await FoodItem.find();
        const groupedMenuItems = {};
        menuItems.forEach(item => {
            if (!groupedMenuItems[item.category]) {
                groupedMenuItems[item.category] = [];
            }
            groupedMenuItems[item.category].push(item);
        });
        res.render("landpage", { layout: "layouts/main", menuItems: groupedMenuItems });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Skip authentication for certain routes
server.use(skipAuthForRoutes(['/landingPage','/landingPage/admin', '/landingPage/admin/register','/landingPage/reviews', '/landingPage/chefs']));

// Routes
server.use("/", foodSiteRoute);
server.use("/", adminSiteRoute);
server.use("/", chefSiteRoute);

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
  console.log(`Server started at localhost:3000`);
});
