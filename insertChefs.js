const mongoose = require('mongoose');
const Chef = require('./models/Chef'); // Adjust the path to your Chef model

mongoose.connect('mongodb://localhost:27017/fa21-bcs-b', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");

    const chefsData = [
      { name: "Chef John", imageURL: "/images/guyChefIcon.jpg", rating: 4.5, availability: "Available", specialties: ["Italian", "French"] },
      { name: "Chef Emily", imageURL: "/images/ladyChefIcon.jpg", rating: 4.2, availability: "Available", specialties: ["Japanese", "Sushi"] },
      { name: "Chef Michael", imageURL: "/images/guyChefIcon.jpg", rating: 4.8, availability: "Busy", specialties: ["Mexican", "Tacos"] },
      { name: "Chef Sarah", imageURL: "/images/ladyChefIcon.jpg", rating: 4.0, availability: "Available", specialties: ["Indian", "Curry"] },
      { name: "Chef David", imageURL: "/images/guyChefIcon.jpg", rating: 4.7, availability: "Busy", specialties: ["Chinese", "Dim Sum"] },
      { name: "Chef Anna", imageURL: "/images/ladyChefIcon.jpg", rating: 4.3, availability: "Available", specialties: ["Thai", "Pad Thai"] },
      { name: "Chef James", imageURL: "/images/guyChefIcon.jpg", rating: 4.6, availability: "Available", specialties: ["American", "Burgers"] },
      { name: "Chef Lisa", imageURL: "/images/ladyChefIcon.jpg", rating: 4.1, availability: "Busy", specialties: ["French", "Pastry"] },
      { name: "Chef Mark", imageURL: "/images/guyChefIcon.jpg", rating: 4.9, availability: "Available", specialties: ["Mediterranean", "Tapas"] },
      { name: "Chef Olivia", imageURL: "/images/ladyChefIcon.jpg", rating: 4.4, availability: "Available", specialties: ["Vietnamese", "Pho"] }
    ];

    Chef.insertMany(chefsData)
      .then(() => {
        console.log("Chefs data inserted");
        mongoose.connection.close();
      })
      .catch(error => {
        console.error("Failed to insert chefs data:", error);
        mongoose.connection.close();
      });
  })
  .catch(error => {
    console.error("DB Connection Error:", error);
  });
