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

app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started...");
});