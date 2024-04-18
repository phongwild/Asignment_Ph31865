var db = require('./db');
var mongoose = require('mongoose');
//định nghĩa khuôn mẫu
const spSchema = new db.mongoose.Schema(
    {
        time: { type: String, required: true },
        date: { type: String, required: true },
        cartId: { type: mongoose.Schema.ObjectId, required: false, ref:'Cart' },
    },
    {
        collection: 'History'
    }
);
// tao model
let spHistory = db.mongoose.model('spHistory', spSchema);
module.exports = { spHistory }