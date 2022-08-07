var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "orderList":Array,
    "cartList":[
        {
            "productId":String,
            "productName":String,
            "salePrice":String,
            "productImage":String,
            "checked":String,
            "productNum":String,
        }
    ],
    "addressList":[
        {
            "addressId": String,
            "userName": String,
            "streetName": String,
            "postCode": String,
            "tel": String,
            "isDefault": Boolean
        }
    ],
    // "orderList":[
    //     {
    //        "orderId":String,
    //        "orderTotal":Number,
    //        "addressInfo":String,
    //        "goodsList":Array,
    //        orderStatus:String,
    //        "createDate":String
    //     }
    // ]
});
module.exports = mongoose.model('User',userSchema);