var passportLocalMongoose   = require("passport-local-mongoose"),
    LocalStrategy           = require("passport-local"),
    User                    = require("./models/user"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    mongoose                = require("mongoose"),
    express                 = require("express");
    
var app                     = express();

mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true});

app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "Mustangs are better than Camaros",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// Takes data, encodes it, and puts back into session
passport.serializeUser(User.serializeUser());
// Reads session, takes data and unencodes it
passport.deserializeUser(User.deserializeUser());


// ==================== //
//        ROUTES        //
// ==================== //

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// Show sign-up form
app.get("/register", function(req, res){
    res.render("register");
});

// Handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

// Render login form
app.get("/login", function(req, res) {
    res.render("login");
});

// Login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

// Logout logic
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
};

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started...");
});