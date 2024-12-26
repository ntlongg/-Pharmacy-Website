const OrderModel = require("../../models/invoiceModel")


const deleteOrderProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const OrderToCartProductId = req.body._id

        const deleteProduct = await OrderModel.deleteOne({ _id : OrderToCartProductId})

        res.json({
            message : "Product Deleted From Order",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteOrderProduct