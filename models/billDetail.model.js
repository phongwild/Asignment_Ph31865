var db = require('./db');
//định nghĩa khuôn mẫu
const spSchema = new db.mongoose.Schema(
    {
        productId: { type: String, required: true },
        email: { type: String, required: true},
        quantity: { type: Number, required: true},
    },
    {
        collection: 'BillDetails'
    }
);
// tao model
let billDetailModel = db.mongoose.model('billDetailModel', spSchema);
module.exports = { billDetailModel }