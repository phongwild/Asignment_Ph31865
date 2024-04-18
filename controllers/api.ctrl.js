var mdProduct = require('../models/modelProduct');
var { userModel } = require('../models/user.model');
var mdBill = require('../models/bill.model');
var mdBillDetail = require('../models/billDetail.model');
var mdCate = require('../models/cate.model');
var mdCart = require('../models/cart.model');
var { spHistory } = require('../models/history.model');
const bcrypt = require("bcrypt");
var fs = require('fs');
//Account
exports.doLogin = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await userModel.findByCredentials(req.body.email, req.body.password)
        if (!user) {
            return res.status(401).json({ error: 'Sai thông tin đăng nhập' })
        } else {
            const token = await user.generateAuthToken();
            return res.status(200).send(user, token);
        }
    } catch (error) {
        console.log(error)
        if (error.message === 'Không tồn tại user') {
            return res.status(401).json({ error: 'Sai thông tin đăng nhập' })
        } else if (error.message === 'Sai password') {
            return res.status(401).json({ error: 'Mật khẩu sai' })
        } else {
            return res.status(500).json({ error: 'Lỗi máy chủ' }) // Lỗi chung cho các vấn đề không mong muốn
        }
    }
}
exports.doRegister = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const user = new userModel(req.body);
        user.password = await bcrypt.hash(req.body.password, salt);
        const token = await user.generateAuthToken();
        let new_u = await user.save()
        return res.status(201).json({ status: 1, msg: 'Đăng ký thành công', token });
    } catch (error) {
        return res.status(400).send(error)
    }
}
//user
exports.xemUser = async (req, res, next) => {
    try {
        const users = await userModel.find();
        if (!users) {
            return res.status(404).json({ error: 'Không có tài khoản nào' });
        }
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server' });
    }
}
exports.user = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Tài khoản không tồn tại' });
        }
        return res.status(200).json(user);
    } catch (error) {

    }
}
//Product
exports.doProduct = async (req, res, next) => {
    let dk = null;
    if (typeof (req.query.price) != 'undefined') {
        dk = { price: req.query.price }
    }

    let list = await mdProduct.spModel.find(dk).sort({ name: 1 });

    res.status(200).json(list)
}
exports.XemChiTiet = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await mdProduct.spModel.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Lỗi hệ thống' });
    }
}
exports.Them = async (req, res, next) => {
    try {
        const newProduct = new mdProduct.spModel({
            Product_name: req.body.Product_name,
            Description: req.body.Description,
            Price: req.body.Price,
            cateId: req.body.cateId,
            imgProduct: req.body.link_anh
        });

        let saveProduct = await newProduct.save();
        return res.status(200).json({
            msg: 'Thêm thành công',
            data: saveProduct._id
        });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi hệ thống' })
    }
}
exports.Sua = async (req, res, next) => {
    const productId = await req.params.id;
    try {
        const product = await mdProduct.spModel.findById(productId);
        if (!product) {
            return res.status(400).json({ error: 'Sản phẩm không tồn tại' });
        }
        if (req.body.Product_name) product.Product_name = req.body.Product_name;
        if (req.body.Description) product.Description = req.body.Description;
        if (req.body.Price) product.Price = req.body.Price;
        if (req.body.imgProduct) product.imgProduct = req.body.imgProduct;
        await product.save();
        return res.status(200).json({ error: 'Cập nhật sản phẩm thành công' });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi hệ thống' });
    }
}
exports.Xoa = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await mdProduct.spModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
        }
        await product.deleteOne();

        return res.status(200).json({ message: 'Xóa sản phẩm thành công!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Lỗi hệ thống' });
    }
}
//Bill
exports.xemBill = async (req, res, next) => {
    try {
        const bill = await mdBill.billModel.find();
        if (!bill) {
            return res.status(404).json({ error: 'Không có hoá đơn nào' });
        }
        res.status(200).json(bill);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server' });
    }
}
//BillDetails
exports.xemBillDetail = async (req, res, next) => {
    try {
        const billDetails = await mdBillDetail.billDetailModel.find();
        if (!billDetails) {
            return res.status(404).json({ error: 'Không có hoá đơn nào' });
        }
        res.status(200).json(billDetails);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server' });
    }
}
//xem bill theo id
exports.BillId = async (req, res, next) => {
    try {
        const billId = req.params.id;
        const viewBill = await mdBill.billModel.findById(billId);
        if (!viewBill) {
            return res.status(404).json({ error: 'Bill không tồn tại' });
        }
        return res.status(200).json(viewBill);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server' });
    }
}
//Category
exports.xemDsLoaiSp = async (req, res, next) => {
    try {
        const category = await mdCate.cateModel.find();
        if (!category) {
            return res.status(404).json({ error: 'Không tồn tại' });
        }
        res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server' });
    }
}
//Add to cart
exports.ThemVaoGioHang = async (req, res, next) => {
    try {
        const { prId, quantity } = req.body;
        const cart = await mdCart.cartModel.find();
        if (!cart) {
            await mdCart.cartModel.create({
                prId: prId,
                quantity: quantity
            });
            return res.status(201).json(cart);
        }
        else {
            const newCart = new mdCart.cartModel({
                prId: prId,
                quantity: quantity
            });
            await newCart.save();
            return res.status(201).json(newCart);
        }
    } catch (error) {
        return res.status(201).json({ error: 'Lỗi server' });
    }
}
exports.XemGioHang = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const cart = await mdCart.cartModel.find(); // Tìm giỏ hàng của người dùng
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server' });
    }
}
exports.XoaGioHang = async (req, res, next) => {

}
exports.XemLichSu = async (req, res, next) => {
    try {
        const history = await spHistory.find();
        if (!history) {
            return res.status(404).json({ error: 'Chưa có lịch sử đặt hàng' });
        }
        return res.status(200).json(history);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server' });
    }
}
exports.DatHang = async (req, res, next) => {
    try {
        const { cartId } = req.body;
        const history = await spHistory.create({
            cartId: cartId,
            time: req.body.time,
            date: req.body.date
        });
        const thisHistory = await history.save();
        return res.status(201).json(thisHistory);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server' });
    }
}