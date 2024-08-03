const User = require('../models/user');
const Car = require('../models/car');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !user.isAdmin || !await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token });
};

exports.createCar = async (req, res) => {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
};

exports.getCars = async (req, res) => {
    const cars = await Car.find({});
    res.send(cars);
};

exports.updateCar = async (req, res) => {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(car);
};

exports.deleteCar = async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.send({ message: 'Car deleted' });
};

exports.dashboard = async (req, res) => {
    const cars = await Car.find({});
    const totalCars = cars.length;
    res.send({ totalCars, cars });
};

