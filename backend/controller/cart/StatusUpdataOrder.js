const OrderModel = require("../../models/invoiceModel")

const StatusUpdataOrder = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        // Cập nhật trạng thái của đơn hàng thành 'đang xử lý'
        const UpdateOrder = await OrderModel.findByIdAndUpdate(addToCartProductId, { status: 'Đã xác nhận, đang giao hàng' }, { new: true });

        res.json({
            message: "cập nhật trạng thái đơn hàng thành công",
            error: false,
            success: true,
            data: UpdateOrder
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = StatusUpdataOrder;