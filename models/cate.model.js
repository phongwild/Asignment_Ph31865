var db = require('./db');
//định nghĩa khuôn mẫu
const spSchema = new db.mongoose.Schema(
    {
        CateName: { type: String, required: true },
    },
    {
        collection: 'Category'
    }
);
// tao model
let cateModel = db.mongoose.model('cateModel', spSchema);
module.exports = { cateModel }