var mongoose = require('mongoose')
var Scheme = mongoose.Schema

var productScheme = new Scheme({
    "productId":String,
	"productName":String,
	"salePrice":Number,
	"productImage":String,
	"productNum":Number,
	"checked":String,
})

module.exports = mongoose.model('Good',productScheme)