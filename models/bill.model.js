var db = require('./db');
//định nghĩa khuôn mẫu
const spSchema = new db.mongoose.Schema(
    {
        Date: { type: String, required: true },
        email: { type: String, required: true},
    },
    {
        collection: 'Bill'
    }
);
// tao model
let billModel = db.mongoose.model('billModel', spSchema);
module.exports = { billModel }