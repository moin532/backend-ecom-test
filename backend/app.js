const express = require('express');
const app = express();
const dotenv =require('dotenv');
var cors = require('cors');

const errorMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload")
const path = require("path");


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileupload());
app.use(cors({
    // origin:'https://frontend-ecom-k3xg-g2zxhal4a-moin532s-projects.vercel.app',
    methods:["GET","PUT","POST","DELETE"], 
    credentials: true,
}));
// app.set("trust proxy", true);

//Route imports
const product = require('./routes/productroute');
const user = require('./routes/UserRoutes');
const order = require('./routes/OrderRoute');


//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:'backend/config/config.env'});
}

//Route imports use
app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);

// app.use(express.static(path.join(__dirname,"../frontee/build")));

// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"../frontee/build/index.html"));
// })


app.get('/', (req, res) => {
    res.send('<h1>route is working now</h1>')
})

//middleware for error
app.use(errorMiddleware);

module.exports = app
