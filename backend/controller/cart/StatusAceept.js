const OrderModel = require("../../models/invoiceModel")

const StatusAceept = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        // Cập nhật trạng thái của đơn hàng thành 'đang xử lý'
        const UpdateOrder = await OrderModel.findByIdAndUpdate(addToCartProductId, { status: 'Đã nhận hàng' }, { new: true });

        res.json({
            message: "đã xác nhận đã nhận hàng",
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

module.exports = StatusAceept;