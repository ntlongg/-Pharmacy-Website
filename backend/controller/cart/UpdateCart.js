const OrderModel = require("../../models/invoiceModel");
const addToCartModel = require("../../models/cartProduct");

const AddToCart = async (req, res) => {
    try {
        const totalQty = req.body.totalQty;
        const currentUser = req.userId;
        const { productId } = req.body;
        const totalPrice = req.body.totalPrice;

        const newAddToCart = {
            ...req.body,
            userId: currentUser,
            productId: productId,
            totalQty:totalQty,
            totalPrice:totalPrice
            
        };

        const order = new OrderModel(newAddToCart);
        const saveProduct = await order.save();
        const removeCartItems = await addToCartModel.deleteMany({ userId: currentUser });

        // Kiểm tra xem removeCartItems đã hoạt động chính xác hay không
        console.log(`${removeCartItems.deletedCount} mục đã được xóa khỏi giỏ hàng của userId: ${currentUser}`);

        return res.json({
            data: saveProduct,
            message: "Đặt hàng thành công",
            success: true,
            error: false
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = AddToCart;