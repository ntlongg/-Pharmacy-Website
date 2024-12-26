const OrderModel = require("../../models/invoiceModel")



async function allOder(req,res){
    try{
        console.log("useId",req.userId)

        const allOder = await OrderModel.find().populate("productId").populate("userId")

        res.json({
            message : "All order details",
            data : allOder,
            success : true,
            error : false
        })
    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false
          });
    }
}

module.exports = allOder