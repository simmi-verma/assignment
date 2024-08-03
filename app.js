const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); 
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const { emitWarning } = require('process');
require('dotenv').config();
const port =3001; 
const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/quadiro-assignment', {
    useNewUrlParser: true,
   useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    process.exit(1); // Optional: exit the process
  });
const userSchema={
    email: String,
    password: String
}

  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optional: add logic to handle the rejection
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Set views directory and view engine
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  
app.use(adminRouter);
app.use(userRouter);
app.get('/', (req, res) => {
    res.render('login'); // Assuming you have a login.ejs file
});
app.get('/register', (req, res) => {
    res.render('dashboard.ejs'); // Assuming you have a register.ejs file
});
app.post('/register', (req, res) => {
    const newUser=new User({
        username: req.body.username,
        password: req.body.password 
    }); 
    newUser.save(function(err) {
     if(err){
          console.log(err);
        }
        else{
            res.render("dashboad.html"); 
       }
});
    });


app.get('/dashboard', (req, res) => {
    // Fetch data from the database if needed and pass it to the view
    res.render('dashboard', {totalCars:10}); // Assuming you have a dashboard.ejs file
});



app.get('/', (req, res) => {
    res.send('Assignment for Quadiro Technologies');
});

app.listen(3001, () => {
    console.log('Server is up on port 3001');
});
