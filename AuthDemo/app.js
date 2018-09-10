var passportLocalMongoose   = require("passport-local-mongoose"),
    LocalStrategy           = require("passport-local"),
    User                    = require("./models/user"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    mongoose                = require("mongoose"),
    express                 = require("express"),
    app                     = express();

mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ====== //
// ROUTES //
// ====== //
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started...");
});