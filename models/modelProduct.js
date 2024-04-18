var db = require('./db');
//định nghĩa khuôn mẫu
const spSchema = new db.mongoose.Schema(
    {
        Product_name: { type: String, required: true },
        Description: { type: String, required: false},
        Price: { type: Number, required: false },
        cateId: { type: String, required: false},
        imgProduct: {type: String, required: false}
    },
    {
        collection: 'Product'
    }
);
// tao model
let spModel = db.mongoose.model('spModel', spSchema);
module.exports = { spModel }