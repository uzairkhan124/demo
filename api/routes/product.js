const express = require('express');
const route = express.Router();
const mongoose = require ('mongoose');

const Product = require('../models/product');

route.post('/',(req,res,next)=>{
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            'message' : 'Product Created Succesfully',
            createdProduct : {
                name : result.name,
                price : result.price,
                _id : result._id,
                request : {
                    type : "GET",
                    url : 'http://localhost:3000/products/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
        
    });   
});
 

route.get('/', (req,res,next) => {
    Product.find()
    .select("name price _id")
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            products : docs.map(doc =>{
                return{
                    name : doc.name,
                    price : doc.price,
                    _id : doc._id,
                    request: {
                        type : "GET",
                        url : 'http://localhost:3000/products/' + doc._id
                    }
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log("its wrong");
        res.status(500).json({
            error : err
        });
    });
});

route.get('/:productId',(req,res,next)=>{
    const id = req.params.productId ;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message : 'No valid entry found'});
        }
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error : err});
    })
});

route.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId ;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.updateOne({ _id : id }, { $set : updateOps}).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message : "Product Updated",
            request : {
                type : "GET",
                url : 'http://localhost:3000/products/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

route.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId ;
    Product.remove({_id : id}).exec().then(result => {
        console.log(result)
        res.status(200).json({
            message : "Product deleted",
            request : {
                type : "POST",
                url : "http://localhost/products/",
                body : { name : 'String', price : 'Number'}
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = route ;