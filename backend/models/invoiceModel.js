const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId : {
        ref : 'product',
        type : String,
   },
   quantity : Number,
   userId : {
        ref : 'user',
        type : String,
   },

   totalQty : {
    type : Number,
},
    totalPrice : {
    type : Number,

},
status: {
    type: String,
    enum: ['Chờ xác nhận', 'Đã xác nhận, đang giao hàng', 'Đã nhận hàng'],
    default: 'Chờ xác nhận'
}
}, {
    timestamps: true
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
