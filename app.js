const express = require('express');
const app = express();
const productRoute = require ('./api/routes/product');
const orderRoute = require ('./api/routes/order');
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect('mongodb+srv://admin:'+ process.env.DB_PW + '@cluster0.csxrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
   // useMongoClient : true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,GET,DELETE,GET,PATCH');
    };
    next();
});

app.use('/products',productRoute);

app.use('/orders',orderRoute);

app.use((req,res,next)=> {
    const error = new Error('NOt Found');
    error.status = 404 ;
    next(error); 
});

app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});

module.exports = app ;