// Import the Express framework

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
// Import controller functions that handle the actual logic for these routes
const {
    registerUser,   // Function to handle user registration
    loginUser,      // Function to handle user login
    getUserInfo,    // Function to retrieve user information
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

// Create a new router object using Express
const router = express.Router();

// Define routes and attach controller functions to handle them

// Route to register a new user (POST /api/v1/auth/register)
router.post("/register", registerUser);

// Route to log in an existing user (POST /api/v1/auth/login)
router.post("/login", loginUser);

// Route to get the authenticated user's info (GET /api/v1/auth/getUser)
// 'protect' middleware should be added here to restrict access to logged-in users
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No files Uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
}); 

// Export the router so it can be used in the main server file (app.js or index.js)
module.exports = router;
