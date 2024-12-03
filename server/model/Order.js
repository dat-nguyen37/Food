const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    product:[
        {
            shopId:String,
            productId:String,
            productName:String,
            image:String,
            size:String,
            color:String,
            quantity:Number,
            price:Number,
            confimationStatus:{
                type:String,
                enum: ['Chưa xác nhận', 'Đã xác nhận',  'Đang giao', 'Đã giao', 'Đã hủy'],
                default: 'Chưa xác nhận',
            },
        }
    ],
    paymentStatus:{
        type:String,
        enum: ['Chưa thanh toán', 'Đã thanh toán'],
        default: 'Chưa thanh toán',
    },
    name:{  
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    description:{
        type:String
    },
    shipping:String,
    price:{
        type:Number
    }

},
{timestamps:true})
module.exports=mongoose.model("order",orderSchema)