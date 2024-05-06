const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));

const PORT = 3000; // Or any port you prefer

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Assuming your CSS file is in the 'public' directory

// Landing Page Admin View
app.get('/LandingPage/admin/foods/new', (req, res) => {
    res.render('adminSide/addMeals'); // Assuming you set up your views in a 'views' directory
});

// API to handle adding new food items
app.post('/api/foods', (req, res) => {
    const { imageUrl, name, price } = req.body;
    // Here you would handle adding the new food item to your database
    // Example: Save to MongoDB or any other database
    console.log('New Food Item:', { imageUrl, name, price });
    res.json({ message: 'Food item added successfully!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
