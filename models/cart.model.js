var db = require('./db');
var mongoose = require('mongoose');
//định nghĩa khuôn mẫu
const spSchema = new db.mongoose.Schema(
    {
        quantity: { type: Number, required: false, default: 1 },
        prId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Product' },
        price: {type: Number, required: false, default: 300},
        img: {type: String, required: false, default:'https://cdn-icons-png.flaticon.com/256/9862/9862079.png'}
    },
    {
        collection: 'Cart'
    }
);
// tao model
let cartModel = db.mongoose.model('cartModel', spSchema);
module.exports = { cartModel }