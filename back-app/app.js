const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const morgan = require('morgan')
//var db = require("./bin/db")
const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

var etRouter = require('./router/etudiant');

var allowlist = ['http://localhost:3000/router/etudiant']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

//log request
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/router/etudiant');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', ['Content-Type','Authorization']);
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   if (req.method == "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/router/etudiant',etRouter);
app.get("/", function(req, res) {
    res.send("Hello")
    
})

app.listen(3000, function() {
    console.log("server is running on port 3000")   
})