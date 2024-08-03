const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/admin/cars', auth('admin'), adminController.createCar);
router.get('/admin/cars', auth('admin'), adminController.getCars);
router.patch('/admin/cars/:id', auth('admin'), adminController.updateCar);
router.delete('/admin/cars/:id', auth('admin'), adminController.deleteCar);

module.exports = router;

