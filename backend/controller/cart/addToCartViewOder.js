const OrderModel = require("../../models/invoiceModel")


const ViewOder = async(req,res)=>{
    try{
        const currentUser = req.userId

        const allProduct = await OrderModel.find({
            userId : currentUser
        }).populate("productId").populate("userId")

        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports =  ViewOder