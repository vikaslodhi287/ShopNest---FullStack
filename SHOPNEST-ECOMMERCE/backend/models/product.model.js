const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: String,
        default: 0,
    }
}, {
    timestamps: true,
})

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;