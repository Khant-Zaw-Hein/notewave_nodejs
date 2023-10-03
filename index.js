var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// import routes
const loginRoutes = require("./routes/Login");
const todoRoutes = require("./routes/Todo");
const userAccountRoutes = require("./routes/UserAccount");
const registerRoutes = require("./routes/Register");

app.use("/login", loginRoutes);
app.use("/todo", todoRoutes);
app.use("/userAccount", userAccountRoutes);
app.use("/register", registerRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // You can specify specific origins instead of '*'
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true); // If your client sends credentials (cookies, HTTP authentication)

    // Handle pre-flight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

var port = process.env.PORT || 4200;
app.listen(port);
console.log('todolist api application is running on port: ' + port);