const express = require('express');
const session = require('express-session');
const { registration, dbProvider, moviewDetails } = require('./clients/postgres');
const app = express();
const port = 3000;
const registrationData = {};
// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'your-secret-key', // Change this to a strong, random key
    resave: false,
    saveUninitialized: true
}));

// Route to display the sign-up form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
// Route to display the login form
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Registration route
app.post('/register', async (req, res) => {
    // Process registration logic here
    // For this example, we'll just print the data.
    const email = req.body.email;
    const password = req.body.password;
    console.log(`Registration successful! Email: ${email}`);
    req.session.email = email;
    await registration.registerUser(email,password);
    registrationData[email] = password;
    // Redirect to a welcome page or the login page
    res.redirect('/welcome');
});

// Login route
app.post('/login', async (req, res) => {
    // Process registration logic here
    // For this example, we'll just print the data.
    const email = req.body.email;
    const inputPassword = req.body.password;
    const {password: dbPassword} = await registration.fetchUser(email);
    console.log(dbPassword, inputPassword)
    if (dbPassword && dbPassword === inputPassword) {
        req.session.email=email;
        // Redirect to a welcome page or the login page
        res.redirect('http://localhost:3000/welcome');
    } else {
        res.send('ERRORRR')
    }

});
// Login route
app.post('/addNewMovie', async (req, res) => {
    // Process registration logic here
    // For this example, we'll just print the data.
    const movieName = req.body.name;
    const cast = req.body.cast;
    const genre = req.body.genre;
    const releaseDate = req.body.release_date;
    const rating = req.body.rating;
    await moviewDetails.addMovie(movieName,rating,cast,genre,releaseDate);
    console.log(movieName, cast, genre, releaseDate, rating)

});
// get movies route
app.get('/getMoviesFromDB', async (req, res) => {
    const allMovies = await moviewDetails.fetchAllMovies();
    console.log(allMovies)
    res.json(allMovies) 
});
// get movies route
app.get('/editMovie', async (req, res) => {
    const allMovies = await moviewDetails.editMovie(req.body.movieName);
    console.log(allMovies)
    res.json(allMovies) 
});
// get movies route
app.get('/deleteMovie', async (req, res) => {
    const allMovies = await moviewDetails.deleteMovies(req.body.movieName);
    console.log(allMovies)
    res.json(allMovies) 
});

// Welcome page
app.get('/welcome', (req, res) => {
    if (req.session.email) {
        res.redirect('./public/welcome.html')
    } else {
        res.redirect('http://localhost:3000/login'); // Redirect to the login page if the session is not set
    }
});


// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }

        res.sendFile(__dirname + '/public/login.html'); // Redirect to the login page after logout
    });
});

// Serve static files (HTML)
app.use(express.static(__dirname));

app.listen(port, async () => {
    await dbProvider.initConnection();
   // await moviewDetails.addMovie()
    console.log(`Server is running on port ${port}`);
});
