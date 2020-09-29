// import required essentials
const http = require("http");
const express = require("express");
var cors = require('cors');

// import `items` from `routes` folder 
const itemsRouter = require('./routes/items');

// create new app
const app = express();
app.use(express.json());

// use it before all route definitions
// allowing below URL to access these APIs end-points
// you can replace this URL(http://localhost:8100) with your
// application URL from where you are calling these APIs
app.use(
  cors({
    origin: 'http://localhost:3000',
    preflightContinue: true,
    methods: "GET, PUT, POST, DELETE",
    credentials: true
  })
);

// FIXING CORS PROBLEMS Access to XMLHttpRequest at 'http://localhost:3000/items' 
//from origin 'http://localhost:4200' has been blocked by CORS policy: The 'Access-Control
//-Allow-Origin' header has a value 'http://localhost:3000' that is not equal to the supplied origin.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

/* this '/items' URL will have two end-points:
→ localhost:3000/items/ (this returns array of objects)
→ localhost:3000/items/:id (this returns single object)
*/
app.use('/items', itemsRouter);

// default URL to API
app.use("/", function (req, res) {
  res.send("malibu-node-ex-api works :-)");
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug("Server listening on port " + port);
