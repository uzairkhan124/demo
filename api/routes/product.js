const express = require('express');
const route = express.Router();

const multer = require ('multer');
const authCheck = require ('../middleware/jwt-auth')
const ProductController = require('../controllers/product');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req , file , cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null , true);
    } 
    else cb(null,false);
}
const upload = multer({
        storage: storage ,
        limits : {
            fileSize : 1024 * 1024* 5
        },
        fileFilter : fileFilter
    });



route.post('/' , authCheck, upload.single('productImage'), ProductController.product_post);
 

route.get('/', ProductController.product_get_all);

route.get('/:productId',ProductController.product_get_id);

route.patch('/:productId',authCheck,ProductController.product_patch);

route.delete('/:productId', authCheck,ProductController.product_delete);

module.exports = route ;