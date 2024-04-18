var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api.ctrl');
var mdw = require('../middleware/api.auth');
//upload file
var multer = require('multer');
var objUpload = multer({ dest: '../tmp' }); 
// http://localhost:3000/api/login
router.post('/login', apiCtrl.doLogin);
// http://localhost:3000/api/register
router.post('/register', apiCtrl.doRegister);
//xem user http://localhost:3000/api/users
router.get('/users', apiCtrl.xemUser);

router.get('/user/:id', apiCtrl.user);
// http://localhost:3000/api/products
router.get('/products', apiCtrl.doProduct);

router.get('/products/:id', apiCtrl.XemChiTiet);

router.post('/products', objUpload.single('image'), apiCtrl.Them);

router.put('/products/:id', objUpload.single('image'), apiCtrl.Sua);

router.delete('/products/:id', apiCtrl.Xoa);
//xem bill http://localhost:3000/api/bill
router.get('/bill', apiCtrl.xemBill);

router.get('/bill/:id',  apiCtrl.BillId);
// xem bill detail http://localhost:3000/api/billDetails
router.get('/billDetails', apiCtrl.xemBillDetail);
// xem loại sản phẩm
// http://localhost:3000/api/category
router.get('/category',  apiCtrl.xemDsLoaiSp);
//Giỏ hàng
router.get('/cart', apiCtrl.XemGioHang);
router.post('/cart/add', apiCtrl.ThemVaoGioHang);
//lịch sử đặt hàng
router.get('/history', apiCtrl.XemLichSu);
router.post('/history/add', apiCtrl.DatHang);

module.exports = router;