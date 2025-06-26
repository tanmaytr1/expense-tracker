// routes/dashboardRoutes.js
const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const { getDashboardData } = require('../controllers/dashboardController');

// console.log('Type of protect:', typeof protect); // Add this
// console.log('Type of getDashboardData:', typeof getDashboardData); // Add this

const router = express.Router();

router.get('/', protect, getDashboardData);

module.exports = router;