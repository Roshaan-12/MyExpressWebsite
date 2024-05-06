const express = require("express");
const router = express.Router();
const FoodItem = require("../../models/FoodItems");

router.get("/LandingPage/admin/dashboard/new",(req, res) => {
  res.render("adminSide/addMeals");
});

router.post("/LandingPage/admin/dashboard/new", async (req, res) => {
  try {
    const { imageURL, name, price, category } = req.body;
    const newFoodItem = new FoodItem({ imageURL, name, price, category });
    await newFoodItem.save();
    return res.redirect("/LandingPage/admin/dashboard/new");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error adding food item");
  }
});

router.get("/LandingPage/admin/dashboard/:id/edit", async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).send("Food item not found");
    }
    return res.render("adminSide/editMeal", { foodItem });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching food item for editing");
  }
});

router.post("/LandingPage/admin/dashboard/:id/edit", async (req, res) => {
  try {
    let foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).send("Food item not found");
    }
    // Update food item properties here
    await foodItem.save();
    return res.redirect("/LandingPage/admin/dashboard");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error editing food item");
  }
});

router.get("/LandingPage/reviews", (req, res) => {
    res.render("reviews");
});

router.get("/LandingPage/admin/dashboard/:id/delete", async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    return res.redirect("/LandingPage/admin/dashboard");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error deleting food item");
  }
});

router.get("/LandingPage/admin/dashboard/:id/delete", async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    return res.redirect("/LandingPage/admin/dashboard");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error deleting food item");
  }
});

router.get("/LandingPage/admin/dashboard/:page?", async (req, res) => {
  try {
    let page = Number(req.params.page) ? Number(req.params.page) : 1;
    let pageSize = 3;
    let foodItems = await FoodItem.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    let totalFoodItems = await FoodItem.countDocuments();
    let totalPages = Math.ceil(totalFoodItems / pageSize);
    return res.render("adminSide/dashboard", {
      pageTitle: "Available Food Items",
      foodItems,
      totalFoodItems,
      page,
      pageSize,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching food items");
  }
});

module.exports = router;
